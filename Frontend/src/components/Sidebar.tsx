import {
  Hash,
  Instagram,
  Link2,
  PlusIcon,
  Twitter,
  Youtube,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import Button from "./Button";
import CreateContentModal from "./CreateContentModal";
import { useFilterStore } from "../state/useFilterStore";
import { ContentType } from "../config";

export default function Sidebar({ isShare }: { isShare: boolean }) {
  const { activeType, setActiveType } = useFilterStore();
  const [modalOpen, setModalOpen] = useState(false);

  const menuItems = [
    { text: "All Content", icon: <Hash size={20} /> },
    { text: ContentType.Twitter, icon: <Twitter size={20} /> },
    { text: ContentType.Youtube, icon: <Youtube size={20} /> },
    { text: ContentType.Instagram, icon: <Instagram size={20} /> },
    { text: ContentType.Website, icon: <Link2 /> },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 w-72 fixed left-0 top-0 flex flex-col shadow-xl">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
              <img
                src="/second-brain-2.png"
                alt="Brainly"
                className="w-8 h-8 object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Brainly</h1>
            <p className="text-sm text-gray-500">Your Second Brain</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-2">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
            Content Types
          </h3>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.text} onClick={() => setActiveType(item.text)}>
                <SidebarItem
                  text={item.text}
                  icon={item.icon}
                  isActive={activeType === item.text}
                />
              </div>
            ))}
          </div>
        </div>

        {!isShare && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
              Quick Actions
            </h3>
            <Button
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon size={18} />}
              fullWidth={true}
              onClick={() => setModalOpen(true)}
            />
          </div>
        )}
      </div>

      <CreateContentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
}
