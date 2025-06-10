import { X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { ContentType } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContent } from "../api/api";
import { useForm } from "react-hook-form";
import { useToastState } from "../state/useToastStore";

// controlled component
export default function CreateContentModal({ open, onClose }:{
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const showToast = useToastState((state) => state.showToast);

  type FormData = {
    title: string;
    link: string;
    type: ContentType;
    tags: string[] | string;
  };

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate } = useMutation({
    mutationFn: async ({
      title,
      link,
      tags,
      type,
    }: FormData & { type: ContentType }) => {
      const tagsArray =
        typeof tags === "string"
          ? tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t.length > 0)
          : tags;

      await addContent(title, link, type, tagsArray);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
      showToast({ message: "Content Added.", type: "info" });
    },
  });

  const detectType = (link: string): ContentType => {
    if (link.includes("youtube.com") || link.includes("youtu.be"))
      return ContentType.Youtube;
    if (link.includes("instagram.com")) return ContentType.Instagram;
    if (link.includes("twitter.com") || link.includes("x.com"))
      return ContentType.Twitter;
    return ContentType.Website;
  };

  const onSubmit = (data: FormData) => {
    const contentType = detectType(data.link);
    mutate({ ...data, type: contentType });
    reset();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Content
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 group"
            >
              <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="Enter content title"
                    register={register}
                    name="title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link
                  </label>
                  <Input
                    placeholder="Paste your content URL"
                    register={register}
                    name="link"
                  />
                </div>
              </div>

              {/* Tags Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <Input
                  placeholder="Enter tags separated by commas"
                  register={register}
                  name="tags"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use commas to separate multiple tags
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-100">
                <Button
                  variant="primary"
                  text="Add Content"
                  type="submit"
                  fullWidth={true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
