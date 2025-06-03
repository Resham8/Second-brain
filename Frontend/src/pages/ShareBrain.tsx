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
      <Sidebar />
      <div className="p-5 ml-72 min-h-screen bg-gray-200">
        <div className="flex gap-5">
          {contents?.map(({ type, link, title, _id }) => (
            <Card
              key={_id}
              title={title}
              link={link}
              type={type}
              isShare={true}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default ShareBrain;
