import { X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { useRef, useState } from "react";
import { ContentType } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContent } from "../api/api";


// controlled component
export default function CreateContentModal({ open, onClose }) {
  const queryClient = useQueryClient();

  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  const {mutate} = useMutation({
    mutationFn: async () => {
      const title = titleRef.current?.value || "";
      const link = linkRef.current?.value || "";
      await addContent(title, link, type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["content"]});
      onClose()
    }
  })

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/50 fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <X />
                </div>
              </div>
              <div>
                <Input placeholder={"Title"} ref={titleRef} />
                <Input placeholder={"Link"} ref={linkRef} />
              </div>
              <div className="flex justify-center flex-col items-center">
                <h1>Types</h1>
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
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" onClick={() => mutate()} />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
