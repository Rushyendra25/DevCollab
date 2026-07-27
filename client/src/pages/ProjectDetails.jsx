import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getProjectById } from "../services/projectService";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  

  const fetchProject = async () => {
    try {
      const response = await getProjectById(id);

      setProject(response.project);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, []);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto py-20 text-center">
          Loading project...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-5">

        <h1 className="text-5xl font-bold">
          {project.title}
        </h1>

        <p className="text-gray-600 mt-4">
          {project.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-xl mb-6">
              Project Information
            </h2>

            <p><strong>Owner:</strong> {project.owner.name}</p>

            <p className="mt-3">
              <strong>Email:</strong> {project.owner.email}
            </p>

            <p className="mt-3">
              <strong>Team Size:</strong> {project.teamSize}
            </p>

            <p className="mt-3">
              <strong>Status:</strong> {project.status}
            </p>

            <p className="mt-3">
              <strong>Applications:</strong> {project.applicantCount}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-xl mb-6">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {project.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default ProjectDetails;