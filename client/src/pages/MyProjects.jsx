import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditProjectModal from "../components/project/EditProjectModal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DeleteProjectModal from "../components/project/DeleteProjectModal";
import { deleteProject } from "../services/projectService";
import { toast } from "sonner";
import { getMyProjects } from "../services/projectService";

function MyProjects() {

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] =useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditModal, setShowEditModal]=useState(false);
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
  const handleDelete = async () => {
    try {
  
      const response = await deleteProject(selectedProject._id);
  
      toast.success(response.message);
  
      // Remove project from UI immediately
      setProjects((prev) =>
        prev.filter((p) => p._id !== selectedProject._id)
      );
  
      setDeleteModal(false);
      setSelectedProject(null);
  
    } catch (error) {
  
      toast.error(
        error.response?.data?.message ||
        "Unable to delete project"
      );
  
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
                className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <h2 className="text-2xl font-bold">
                  {project.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-5">

                <div className="bg-gray-50 rounded-xl p-4 text-center">

                    <p className="text-gray-500 text-sm">
                        Team Size
                    </p>

                    <p className="text-2xl font-bold">
                        {project.teamSize}
                    </p>

                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center">

                    <p className="text-gray-500 text-sm">
                        Applications
                    </p>

                    <p className="text-2xl font-bold">
                        {project.applicantCount}
                    </p>

                </div>


                <span
                    className={`
                    inline-flex px-4 py-1 rounded-full text-sm font-semibold

                    ${project.status==="Open"
                    ?"bg-green-100 text-green-700"
                    :"bg-red-100 text-red-700"}

                    `}
                    >
                    {project.status}
                </span>

                </div>

                <div className="grid grid-cols-4 gap-3 mt-8">

                    <Link
                        to={`/projects/${project._id}`}
                        className="border rounded-xl py-2 text-center hover:bg-gray-100 transition"
                    >
                        👁 View
                    </Link>

                    <Link
                        to={`/projects/${project._id}/applications`}
                        className="bg-indigo-600 text-white rounded-xl py-2 text-center hover:bg-indigo-700 transition"
                    >
                        👥 Manage
                    </Link>

                    <button
                        onClick={() => {
                        setEditingProject(project);
                        setShowEditModal(true);
                        }}
                        className="border rounded-xl py-2 hover:bg-yellow-50 transition"
                    >
                        ✏ Edit
                    </button>

                    <button
                        onClick={() => {
                            setSelectedProject(project);
                            setDeleteModal(true);
                          }}
                        className="border border-red-500 text-red-600 rounded-xl py-2 hover:bg-red-50 transition"
                    >
                        🗑 Delete
                    </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
      <EditProjectModal
    open={showEditModal}
    project={editingProject}
    onClose={() => setShowEditModal(false)}
    onUpdated={loadProjects}
    />
    <DeleteProjectModal
    open={deleteModal}
    projectTitle={selectedProject?.title}
    onCancel={() => setDeleteModal(false)}
    onDelete={handleDelete}
    />
      <Footer />

    </>
  );
}

export default MyProjects;