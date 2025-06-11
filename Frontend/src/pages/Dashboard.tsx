import { LogOut, Share2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Card from "../components/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBrainContent, getShareLink } from "../api/api";
import { useAuth } from "../state/useAuthStore";

function Dashboard() {  

  const logout = useAuth((state) => state.logout )


  const { data: contents, isLoading } = useQuery({
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
      <Sidebar isShare={false} />
      <div className="p-5 ml-72 min-h-screen bg-gray-200">        
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            text={isPending ? "Sharing..." : "Share Brain"}
            startIcon={<Share2 size={18} />}
            onClick={() => mutate()}
          />
          <Button
            variant="primary"
            text="Logout"
            startIcon={<LogOut size={18} />}
            
          />
        </div>
        <div>Loading.....</div>
      </div>
    </div>;
  }

  return (
    <div>
      <Sidebar isShare={false} />
      <div className="p-5 ml-72 min-h-screen bg-gray-200">
      
        <div className="flex justify-end gap-4">
          
          <Button
            variant="secondary"
            text={isPending ? "Sharing..." : "Share Brain"}
            startIcon={<Share2 size={18} />}
            onClick={() => mutate()}
          />
          <Button
            variant="primary"
            text="Logout"
            startIcon={<LogOut size={18} />}
            onClick={logout}
          />
        </div>
        <div className="columns-3 gap-5 pt-5">
          {contents?.map(({ type, link, title, _id, tags }) => (
            <div key={_id} className="break-inside-avoid">
              <Card
                title={title}
                link={link}
                type={type}
                contentId={_id}
                tags={tags}
                isShare={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
