import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectCard from "../components/common/ProjectCard";
import { getAllProjects } from "../services/projectService";

function Projects() {
    const [projects, setProjects] = useState([]);

    const [filters, setFilters] = useState({
      search: "",
      status: "All",
      skill: "All",
    });
    const availableSkills = [
        "All",
        ...new Set(
          projects.flatMap((project) => project.requiredSkills)
        ),
      ].sort();

    useEffect(() => {
        loadProjects();
      }, [filters]);

      const loadProjects = async () => {
        try {
          const response = await getAllProjects(filters);
      
          setProjects(response.projects);
      
        } catch (error) {
          console.error(error);
        }
      };

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

        <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">

            {projects.length} Project
            {projects.length !== 1 && "s"}

            </h2>

        </div>


        <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <div className="grid md:grid-cols-4 gap-4">

                {/* Search */}

                <input
                type="text"
                placeholder="🔍 Search projects..."
                value={filters.search}
                onChange={(e) =>
                    setFilters({
                    ...filters,
                    search: e.target.value,
                    })
                }
                className="border rounded-xl p-3"
                />

                {/* Status */}

                <select
                value={filters.status}
                onChange={(e) =>
                    setFilters({
                    ...filters,
                    status: e.target.value,
                    })
                }
                className="border rounded-xl p-3"
                >
                <option>All</option>
                <option>Open</option>
                <option>Closed</option>
                </select>

                {/* Skills */}

                <select
                    value={filters.skill}
                    onChange={(e) =>
                        setFilters({
                        ...filters,
                        skill: e.target.value,
                        })
                    }
                    className="border rounded-xl p-3"
                    >
                    {availableSkills.map((skill) => (
                        <option key={skill} value={skill}>
                        {skill}
                        </option>
                    ))}
                </select>

                {/* Clear */}

                <button
                onClick={() =>
                    setFilters({
                    search: "",
                    status: "All",
                    skill: "All",
                    })
                }
                className="bg-gray-800 text-white rounded-xl hover:bg-black transition"
                >
                Clear Filters
                </button>

            </div>

        </div>


     
        {projects.length === 0 ? (
         <div className="bg-white rounded-2xl shadow p-12 text-center">

         <h2 className="text-2xl font-bold">
           No Projects Found
         </h2>
       
         <p className="text-gray-500 mt-3">
           Try changing your search or filters.
         </p>
       
       </div>
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