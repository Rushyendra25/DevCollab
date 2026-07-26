import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectCard from "../components/common/ProjectCard";
import { getAllProjects } from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-10">
          Explore Projects
        </h1>
        <div className="mb-8">
            <input
                type="text"
                placeholder="🔍 Search projects..."
                className="w-full md:w-96 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
            
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Projects;