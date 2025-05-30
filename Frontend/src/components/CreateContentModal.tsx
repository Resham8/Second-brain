import { X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

// controlled component
export default function CreateContentModal({ open, onClose }) {
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
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


