import { X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { ContentType } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContent } from "../api/api";
import { useForm } from "react-hook-form";
import { useState } from "react";

// controlled component
export default function CreateContentModal({ open, onClose }) {
  const queryClient = useQueryClient();

   const [type, setType] = useState(ContentType.Youtube);

  type FormData = {
    title: string;
    link: string;
    type:ContentType;
    tags: string[] | string;
  };

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate } = useMutation({
    mutationFn: async ({ title, link, tags }: FormData) => {
      // let tagsArray: string[] = [];
     const tagsArray =
        typeof tags === "string"
          ? tags
              .split(",")
              .map((tag:string) => tag.trim())
              .filter((tag:string) => tag.length > 0)
          : tags;

      setType(detectType(link)) 
      console.log(type)
      await addContent(title, link, type, tagsArray);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
      onClose();
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
    reset();
  };


  const detectType = (link: string) => {
    if (link.includes("youtube.com") || link.includes("youtu.be"))
      return "youtube";
    if (link.includes("instagram.com")) return "instagram";
    if (link.includes("twitter.com") || link.includes("x.com"))
      return "twitter";
    return "website";
  };

  

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/50 fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded ">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <X />
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Input
                    placeholder={"Title"}
                    register={register}
                    name="title"
                  />
                  <Input placeholder={"Link"} register={register} name="link" />
                </div>
                {/* <div className="flex flex-col ">
                  <h1 className="ml-2.5">Types</h1>
                  <div className="flex gap-2 p-4">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Youtube);
                      }}
                    ></Button>
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Twitter);
                      }}
                    ></Button>
                    <Button
                      text="Instagram"
                      variant={
                        type === ContentType.Instagram ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Instagram);
                      }}
                    ></Button>
                    <Button
                      text="Url"
                      variant={
                        type === ContentType.Website ? "primary" : "secondary"
                      }
                      onClick={() => {
                        setType(ContentType.Website);
                      }}
                    ></Button>
                  </div>
                </div> */}
                <div className="flex flex-col  justify-center gap-1 flex-wrap">
                  <h1 className="ml-2.5">Tags</h1>
                  <Input
                    placeholder={"Enter tags (comma separated)"}
                    register={register}
                    name="tags"
                  />
                </div>
                <div className="flex justify-center">
                  <Button variant="primary" text="Submit" type="submit" fullWidth={true} />
                </div>
              </form>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
