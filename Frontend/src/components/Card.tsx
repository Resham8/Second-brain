import { NotepadText, Share2, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export default function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-md outline-slate-100 outline-2 max-w-72">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 font-medium">
          <div className="text-gray-500">
            <NotepadText />
          </div>
          {title}
        </div>
        <div className="flex gap-3 text-gray-500 items-center">
          <a href={link}>
            <Share2 />
          </a>
          <Trash2 />
        </div>
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
