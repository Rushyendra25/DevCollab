import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getMyProjects } from "../services/projectService";

function MyProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getMyProjects();
      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-5">

        <h1 className="text-4xl font-bold mb-8">
          My Projects
        </h1>

        {projects.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Projects Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Create your first collaboration project.
            </p>

            <Link
              to="/projects/create"
              className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Create Project
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {projects.map((project) => (

              <div
                key={project._id}
                className="bg-white rounded-2xl shadow p-6"
              >

                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {project.description}
                </p>

                <div className="mt-6 space-y-2">

                  <p>
                    👥 Team Size:
                    <strong> {project.teamSize}</strong>
                  </p>

                  <p>
                    📨 Applications:
                    <strong> {project.applicantCount}</strong>
                  </p>

                  <p>
                    📌 Status:
                    <strong> {project.status}</strong>
                  </p>

                </div>

                <div className="flex gap-3 mt-8">

                  <Link
                    to={`/projects/${project._id}`}
                    className="flex-1 border text-center py-2 rounded-xl"
                  >
                    View
                  </Link>

                  <Link
                    to={`/projects/${project._id}/applications`}
                    className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-xl"
                  >
                    Manage
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <Footer />

    </>
  );
}

export default MyProjects;