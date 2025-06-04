import { PlusIcon, Share2 } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateContentModal from "../components/CreateContentModal";
import Button from "../components/Button";
import Card from "../components/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBrainContent, getShareLink } from "../api/api";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: contents,
    isLoading,
  } = useQuery({
    queryKey: ["content"],
    queryFn: () => getBrainContent(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: getShareLink,
    onSuccess: async (shareUrl) => {
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied to clipboard!");
    },
    onError: (error) => {
      console.error("Error generating share link:", error);
      alert("Failed to generate share link.");
    },
  });

  if (isLoading) {
    <div>
      <Sidebar />
      <div className="p-5 ml-72 min-h-screen bg-gray-200">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon size={18} />}
            onClick={() => setModalOpen(true)}
          />
          <Button
            variant="secondary"
            text={isPending ? "Sharing..." : "Share Brain"}
            startIcon={<Share2 size={18} />}
            onClick={() => mutate()}
          />
        </div>
        <div>Loading.....</div>
      </div>
    </div>;
  }

  return (
    <div>
      <Sidebar />
      <div className="p-5 ml-72 min-h-screen bg-gray-200">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon size={18} />}
            onClick={() => setModalOpen(true)}
          />
          <Button
            variant="secondary"
            text={isPending ? "Sharing..." : "Share Brain"}
            startIcon={<Share2 size={18} />}
            onClick={() => mutate()}
          />
        </div>
        <div className="flex gap-5">
          {contents?.map(({ type, link, title, _id }) => (
            <Card
              key={_id}
              title={title}
              link={link}
              type={type}
              contentId={_id}
              isShare={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
