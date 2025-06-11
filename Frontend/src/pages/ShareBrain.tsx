import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { sharedBrain } from "../api/api";
import { useQuery } from "@tanstack/react-query";

function ShareBrain() {
  const { shareLink } = useParams();
  const { data: contents } = useQuery({
    queryKey: ["content"],
    queryFn: () => sharedBrain(shareLink as string),
  });

  return (
    <div>
      <Sidebar isShare={true}/>
      <div className="p-5 ml-72 min-h-screen bg-gray-200">
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

export default ShareBrain;
