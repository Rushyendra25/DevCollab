import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProject } from "../../services/projectService";

function EditProjectModal({
  open,
  project,
  onClose,
  onUpdated,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        description: project.description,
        requiredSkills:
          project.requiredSkills.join(", "),
        teamSize: project.teamSize,
        status: project.status,
      });
    }
  }, [project, reset]);

  if (!open) return null;

  const onSubmit = async (data) => {
    try {
      data.requiredSkills = data.requiredSkills
        .split(",")
        .map((skill) => skill.trim());

      const response = await updateProject(
        project._id,
        data
      );

      toast.success(response.message);

      onUpdated();

      onClose();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Unable to update project"
      );

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
            Edit Project
        </h2>

        <p className="text-gray-500 mt-1">
            Update your project details and save the changes.
        </p>
      </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

        <div>
        <label className="block mb-2 font-semibold">
            Project Title
        </label>

        <input
            {...register("title")}
            className="w-full border rounded-xl p-3"
        />
        </div>

        <div>
        <label className="block mb-2 font-semibold">
            Project Description
        </label>

        <textarea
            rows={5}
            {...register("description")}
            className="w-full border rounded-xl p-3"
        />
        </div>

        <div>
        <label className="block mb-2 font-semibold">
            Required Skills
        </label>

        <input
            {...register("requiredSkills")}
            className="w-full border rounded-xl p-3"
        />
        </div>

            <div>
            <label className="block mb-2 font-semibold">
                Team Size
            </label>

            <input
                type="number"
                {...register("teamSize")}
                className="w-full border rounded-xl p-3"
            />
            </div>

            <div>
            <label className="block mb-2 font-semibold">
                Project Status
            </label>

            <select
                {...register("status")}
                className="w-full border rounded-xl p-3"
            >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
            </select>
            </div>

          <div className="flex justify-end gap-4 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="border rounded-xl px-6 py-2"
            >
              Cancel
            </button>

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-2"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProjectModal;