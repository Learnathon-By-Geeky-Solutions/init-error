
import FilterNav from "@/components/FilterNav/FilterNav";
import Hero from "@/components/home/Hero";
import ProjectCard from "@/components/home/ProjectCard";
import { projectData } from "@/constants";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <FilterNav/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10 py-6">
      {projectData.map((item) => (
        <ProjectCard key={item.id} data={item} />
      ))}
    </div>
    </div>
  );
};

export default HomePage;
