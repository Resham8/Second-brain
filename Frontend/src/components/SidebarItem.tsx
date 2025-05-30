import type { ReactElement } from "react"

export default function SidebarItem({text, icon}:{
    text:string,
    icon: ReactElement
}){
    return <div className="flex gap-3 p-2 text-gray-700 cursor-pointer hover:bg-gray-300 rounded max-w-48 transition-all delay-100">
        {icon} {text}
    </div>
}