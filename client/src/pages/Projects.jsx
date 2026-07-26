import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectCard from "../components/common/ProjectCard";

import { getAllProjects } from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    skill: "All",
  });

  useEffect(() => {
    loadProjects();
  }, [filters]);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await getAllProjects(filters);

      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const availableSkills = useMemo(() => {
    return [
      "All",
      ...new Set(
        projects.flatMap((project) => project.requiredSkills)
      ),
    ].sort();
  }, [projects]);

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero */}

          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl text-white p-10 shadow-xl">

            <h1 className="text-5xl font-bold">
              Explore Projects 🚀
            </h1>

            <p className="mt-4 text-lg opacity-90 max-w-2xl">
              Discover exciting ideas, collaborate with talented
              developers and contribute to meaningful software
              projects.
            </p>

          </div>

          {/* Search */}

          <div className="bg-white rounded-3xl shadow mt-10 p-6">

            <h2 className="text-xl font-semibold mb-6">
              Search & Filters
            </h2>

            <div className="grid md:grid-cols-4 gap-5">

              <div>

                <label className="block mb-2 text-sm font-semibold">
                  Search
                </label>

                <input
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      search: e.target.value,
                    })
                  }
                  placeholder="Search by project title..."
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold">
                  Status
                </label>

                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      status: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                >
                  <option value="All">All</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>

              </div>

              <div>

                <label className="block mb-2 text-sm font-semibold">
                  Skill
                </label>

                <select
                  value={filters.skill}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      skill: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                >
                  {availableSkills.map((skill) => (
                    <option
                      key={skill}
                      value={skill}
                    >
                      {skill}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex items-end">

                <button
                  onClick={() =>
                    setFilters({
                      search: "",
                      status: "All",
                      skill: "All",
                    })
                  }
                  className="w-full bg-gray-900 text-white rounded-xl p-3 hover:bg-black transition"
                >
                  Clear Filters
                </button>

              </div>

            </div>

          </div>

          {/* Header */}

          <div className="flex justify-between items-center mt-10 mb-6">

            <h2 className="text-2xl font-bold">
              Showing {projects.length} Project
              {projects.length !== 1 && "s"}
            </h2>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {Array.from({ length: 6 }).map((_, index) => (

                <div
                  key={index}
                  className="bg-white rounded-2xl shadow p-6 animate-pulse"
                >

                  <div className="h-8 bg-gray-200 rounded w-2/3"></div>

                  <div className="h-4 bg-gray-200 rounded mt-5"></div>

                  <div className="h-4 bg-gray-200 rounded mt-3"></div>

                  <div className="flex gap-2 mt-6">

                    <div className="h-8 w-20 rounded-full bg-gray-200"></div>

                    <div className="h-8 w-20 rounded-full bg-gray-200"></div>

                  </div>

                  <div className="h-10 bg-gray-200 rounded-xl mt-8"></div>

                </div>

              ))}

            </div>

          ) : projects.length === 0 ? (

            <div className="bg-white rounded-3xl shadow p-16 text-center">

              <div className="text-6xl">
                😕
              </div>

              <h2 className="text-3xl font-bold mt-5">
                No Projects Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try changing your search keywords or
                clearing the filters.
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

      </div>

      <Footer />

    </>
  );
}

export default Projects;