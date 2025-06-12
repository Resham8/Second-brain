import { useState, type ReactElement } from "react";

export default function SidebarItem({ text, icon, isActive = false }:{
  text:string,
  icon:ReactElement,
  isActive:boolean,
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        flex items-center gap-3 px-4 py-3 mx-2 rounded-xl cursor-pointer transition-all duration-200 group
        ${isActive 
          ? 'bg-gradient-to-r from-[#5046e4] to-[#4940be] text-white shadow-lg shadow-[#e0e7ff]/50' 
          : 'hover:bg-[#f9fbfc] text-[#95989c] hover:text-[#5046e4]'
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        transition-transform duration-200 
        ${isHovered && !isActive ? 'scale-110' : ''}
        ${isActive ? 'text-white' : 'text-[#95989c] group-hover:text-[#5046e4]'}
      `}>
        {icon}
      </div>
      <span className="font-medium flex-1">{text}</span>      
    </div>
  );
}