import { Share2, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContent } from "../api/api";
import type { ContentType } from "../config";
import { useEffect } from "react";
import { useToastState } from "../state/useToastStore";

interface CardProps {
  title: string;
  link: string;
  type: ContentType;
  tags: string[];
  contentId: string;
  isShare: boolean;
}

export default function Card({
  title,
  link,
  type,
  contentId,
  tags,
  isShare,
}: CardProps) {
  const queryClient = useQueryClient();

  const showToast = useToastState((state) => state.showToast);

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
      // alert("deleted Successfully");
      showToast({ message: "Deleted Successfully", type: "success" });
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

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case "youtube":
        return "🎥";
      case "instagram":
        return "📸";
      case "twitter":
        return "🐦";
      case "website":
        return "🌐";
      default:
        return "📄";
    }
  };

  const transformedUrl = transformUrl({ url: link, type });

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 font-medium items-center">
          <div className="text-gray-500 bg-gray-50 p-2 rounded-lg ">
            <span className="text-base">{getTypeIcon(type)}</span>
          </div>
          <span className="text-gray-900 text-sm">{title}</span>
        </div>
        {!isShare && (
          <div className="flex gap-3 text-gray-500 items-center">
            <a
              href={link}
              className="cursor-pointer hover:text-blue-600 transition-colors"
            >
              <Share2 size={18} />
            </a>
            <a
              onClick={() => mutate()}
              className="cursor-pointer hover:text-red-600 transition-colors"
            >
              <Trash2 size={18} />
            </a>
          </div>
        )}
      </div>
      <div className="">
        {type === "youtube" && (
          <div className="w-full overflow-hidden rounded-lg mb-4 aspect-video">
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
            className="instagram-media"
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
            <a href={transformedUrl}></a>
          </blockquote>
        )}

        {type === "website" && (
          <div className="border rounded-md overflow-hidden bg-gray-50">
            <p>{link}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium border border-blue-200"
            >
              #{tag.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
