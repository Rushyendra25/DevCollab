import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  getProfile,
  updateProfile,
} from "../services/userService";

function Profile() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();

      reset({
        ...response.user,
        skills: response.user.skills?.join(", "),
      });

    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      data.skills = data.skills
        .split(",")
        .map((skill) => skill.trim());

      const response = await updateProfile(data);

      toast.success(response.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to update profile"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-5">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow p-8 space-y-6"
        >

          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("role")}
            placeholder="Role"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("location")}
            placeholder="Location"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("experience")}
            placeholder="Experience"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("github")}
            placeholder="GitHub URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("linkedin")}
            placeholder="LinkedIn URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("portfolio")}
            placeholder="Portfolio URL"
            className="w-full border rounded-lg p-3"
          />

          <input
            {...register("skills")}
            placeholder="React, Node.js, MongoDB"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            {...register("bio")}
            rows={5}
            placeholder="Tell others about yourself..."
            className="w-full border rounded-lg p-3"
          />

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            Save Profile
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
}

export default Profile;