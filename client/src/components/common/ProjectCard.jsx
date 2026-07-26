import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { applyToProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?._id || user?.id;

  const isOwner = project.owner?._id === userId;
  const hasApplied = project.applicants?.includes(userId);
  const isClosed = project.status === "Closed";

  const handleApply = async () => {
    try {
      const response = await applyToProject(project._id);

      toast.success(response.message);

      // Refresh to update applicant count and button state
      window.location.reload();
    } catch (error) {

        const message =
            error.response?.data?.message || "Unable to apply";
    
        toast.error(message);
    
        if (message.includes("Complete your profile")) {
    
            setTimeout(() => {
                navigate("/profile");
            }, 1500);
    
        }
    
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Header */}
      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h2>

            <p className="text-gray-600 mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              project.status === "Open"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {project.status}
          </span>

        </div>

        {/* Skills */}

        <div className="flex flex-wrap gap-2 mt-6">
          {project.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Information */}

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-2">
            <span>👤</span>

            <div>
              <p className="text-xs text-gray-500">
                Project Owner
              </p>

              <p className="font-semibold">
                {project.owner.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>👥</span>

            <div>
              <p className="text-xs text-gray-500">
                Team Required
              </p>

              <p className="font-semibold">
                {project.teamSize} Developers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>📨</span>

            <div>
              <p className="text-xs text-gray-500">
                Applications
              </p>

              <p className="font-semibold">
                {project.applicantCount}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-gray-50 p-5 flex flex-col gap-3">

        <Link
          to={`/projects/${project._id}`}
          className="text-center border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition"
        >
          View Details
        </Link>

        {isOwner ? (
          <button
            disabled
            className="bg-gray-300 text-gray-700 py-2 rounded-xl cursor-not-allowed"
          >
            Your Project
          </button>
        ) : hasApplied ? (
          <button
            disabled
            className="bg-green-600 text-white py-2 rounded-xl"
          >
            ✓ Already Applied
          </button>
        ) : isClosed ? (
          <button
            disabled
            className="bg-gray-300 text-gray-700 py-2 rounded-xl"
          >
            Applications Closed
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
          >
            Apply Now →
          </button>
        )}

      </div>

    </div>
  );
}

export default ProjectCard;