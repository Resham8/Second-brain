import { NotepadText, Share2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContent } from "../api/api";
import type { ContentType } from "../config";
import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: ContentType;
  contentId: string;
  isShare: boolean;
}

export default function Card({
  title,
  link,
  type,
  contentId,
  isShare,
}: CardProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (type === "instagram") {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type]);

  const { mutate } = useMutation({
    mutationFn: () => deleteContent(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      alert("deleted Successfully");
    },
  });

  const transformUrl = ({ url, type }: { url: string; type: string }) => {
    switch (type) {
      case "youtube":
        if (url.includes("youtu.be/")) {
          const videoId = url.split("youtu.be/")[1].split("?")[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (url.includes("/shorts/")) {
          const videoId = url.split("/shorts/")[1].split("?")[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }

        if (url.includes("watch?v=")) {
          return url
            .replace("watch?v=", "embed/")
            .replace("youtube.com", "youtube-nocookie.com");
        }

        return url;

      case "instagram":
        return `${url.replace(/\/$/, "")}/embed/`;

      case "twitter":
        return url.replace("x.com", "twitter.com");

      default:
        return url;
    }
  };

  const transformedUrl = transformUrl({ url: link, type });

  return (
    <div className="p-4 bg-white rounded-md outline-slate-100 outline-2 max-w-96 w-fit h-fit mb-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 font-medium">
          <div className="text-gray-500">
            <NotepadText />
          </div>
          {title}
        </div>
        {!isShare && (
          <div className="flex gap-3 text-gray-500 items-center">
            <a href={link} className="cursor-pointer">
              <Share2 />
            </a>
            <a onClick={() => mutate()} className="cursor-pointer">
              <Trash2 />
            </a>
          </div>
        )}
      </div>
      <div className="pt-4">
        {type === "youtube" && (
          <div
            className={`w-full overflow-hidden rounded-md`}
          >
            <iframe
              className="top-0 left-0 w-full h-full"
              src={transformedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

        {type === "instagram" && (
          <blockquote
            className="instagram-media "
            data-instgrm-permalink={link}
            data-instgrm-version="13"

          >
            {/* data-instgrm-captioned */}
            <div className="instagram-container">
              <div
                style={{
                  padding: "8px 0 40px",
                  paddingBottom: "0",
                  width: "100%",
                  display: "block",
                  whiteSpace: "nowrap", 
                  overflow: "hidden",
                  wordBreak: "break-word",
                  background: "#ffffff",
                  border: "1px solid #dbdbdb",
                  borderRadius: "3px",
                  boxShadow: "0 0 0.2em rgba(0, 0, 0, 0.25)",
                  margin: "0",
                }}
              >
                ...
              </div>
            </div>
          </blockquote>
        )}

        {type == "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "website" && (
          <div className="border rounded-md overflow-hidden bg-gray-50">
            <iframe
              src={link}
              className="w-full h-96"
              frameBorder="0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-3 bg-white border-t">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                {new URL(link).hostname}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
