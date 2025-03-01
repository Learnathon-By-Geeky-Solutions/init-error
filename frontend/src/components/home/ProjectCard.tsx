import { projectData } from "@/constants";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ProjectCard({
  data,
}: {
  data: (typeof projectData)[0];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-900">
      <div
        className="relative w-full h-48"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={data.image}
          alt="Project"
          className="w-full h-full object-cover"
        />
        {hovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-lg font-semibold">{data.title}</p>
          </div>
        )}
      </div>
      <div className="flex items-center p-3">
        <img
          src={data.profilePic}
          alt={data.user}
          className="w-8 h-8 rounded-full mr-2"
        />
        <h3 className="text-sm font-semibold flex items-center gap-1">
          {data.user}{" "}
          
        </h3>
      </div>
      <div className="flex justify-between p-3 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <Heart size={16} /> {data.likes}
        </div>
        <div className="flex items-center gap-1">
           <span className="text-sm font-mono">{data.category}</span>
        </div>
      </div>
    </div>
  );
}
