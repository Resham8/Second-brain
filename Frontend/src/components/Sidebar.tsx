import { BrainCircuit, HashIcon, Instagram, Link, Twitter, Youtube } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className="h-screen bg-white border-r border-gray-300 w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl font-semibold pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <BrainCircuit size={29} />
            </div>            
            Brainly
        </div>
      <div className="pt-4 pl-4">
        <SidebarItem text="Tweets" icon={<Twitter />} />
        <SidebarItem text="Youtube" icon={<Youtube />} />
        <SidebarItem text="Instagram" icon={<Instagram/>}/>
        <SidebarItem text="Links" icon={<Link/>}/>
        <SidebarItem text="tags" icon={<HashIcon/>}/>
      </div>
    </div>
  );
}
