import { NotepadText, Share2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContent } from "../api/api";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId:string;
  isShare:boolean;
}

export default function Card({ title, link, type, contentId, isShare }: CardProps) {
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: () => deleteContent(contentId),
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ["content"]});
      alert("deleted Successfully");
    }
  })

  return (
    <div className="p-4 bg-white rounded-md outline-slate-100 outline-2 max-w-72">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 font-medium">
          <div className="text-gray-500">
            <NotepadText />
          </div>
          {title}
        </div>
        {!isShare && (<div className="flex gap-3 text-gray-500 items-center">
          <a href={link} className="cursor-pointer">
            <Share2 />
          </a>
          <a onClick={() => mutate()} className="cursor-pointer">

          <Trash2 /></a>
        </div>)}
      </div>
      <div className="pt-4">
        {type == "youtube" && (
          <iframe
            className="w-full rounded-md"
            src={link.replace("watch","embed")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type == "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
