import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { createProject } from "../services/projectService";

function CreateProject() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.requiredSkills = data.requiredSkills
        .split(",")
        .map((skill) => skill.trim());

      data.teamSize = Number(data.teamSize);

      const response = await createProject(data);

      toast.success(response.message);

      navigate("/projects");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to create project"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        <Card className="max-w-3xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Create New Project
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Input
              label="Project Title"
              register={register}
              name="title"
              required
              error={errors.title}
            />

            <div className="mb-5">

              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="5"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full border rounded-xl p-3"
              />

              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}

            </div>

            <Input
              label="Required Skills"
              placeholder="React, Node.js, MongoDB"
              register={register}
              name="requiredSkills"
              required
              error={errors.requiredSkills}
            />

            <Input
              label="Team Size"
              type="number"
              register={register}
              name="teamSize"
              required
              error={errors.teamSize}
            />

            <Button type="submit">
              Create Project
            </Button>

          </form>

        </Card>

      </div>

      <Footer />
    </>
  );
}

export default CreateProject;