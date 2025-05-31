import { PlusIcon, Share2 } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateContentModal from "../components/CreateContentModal";
import Button from "../components/Button";
import Card from "../components/Card";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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
            text="Share Brain"
            startIcon={<Share2 size={18} />}
          />
        </div>
        <div className="flex gap-5">
          <Card
            title="Resham x"
            link="https://x.com/RylieOnTheRise/status/1911847049580224613"
            type="twitter"
          />
          <Card
            title="100xdevs video"
            link="https://www.youtube.com/embed/C_lbf_VWF9Y?si=jISWZwhtssHlp9in"
            type="youtube"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
