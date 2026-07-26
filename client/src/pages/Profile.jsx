import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/userService";


const calculateCompletion = (profile) => {

    let completed = 0;

    const fields = [
        "name",
        "role",
        "location",
        "experience",
        "bio",
        "github",
        "linkedin",
        "portfolio",
    ];

    fields.forEach((field) => {
        if (profile[field]) completed++;
    });

    if (profile.skills?.length >= 3)
        completed++;

    return Math.round((completed / 9) * 100);

};
function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    watch
  } = useForm();
  const [completion, setCompletion] = useState(0);
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
      setCompletion(calculateCompletion(response.user));

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
      setCompletion(calculateCompletion(response.user));

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

        <div className="bg-white rounded-xl shadow p-6 mb-8">

            <div className="flex justify-between">

                <span className="font-semibold">
                    Profile Completion
                </span>

                <span>
                    {completion}%
                </span>

            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full mt-4">

                <div
                    className="h-3 rounded-full bg-indigo-600 transition-all"
                    style={{
                        width: `${completion}%`,
                    }}
                />

            </div>

            {completion < 100 && (

                <p className="text-sm text-red-500 mt-3">

                    Complete your profile to unlock project applications.

                </p>

            )}

        </div>




        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

                <div className="flex items-center gap-6">

                    <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">

                        {watch("name")
                            ? watch("name")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()
                            : "U"}

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold">
                            {watch("name") || "Your Name"}
                        </h1>

                        <p className="text-indigo-600 text-lg">
                            {watch("role") || "Software Developer"}
                        </p>

                        <p className="text-gray-500 mt-2">
                            📍 {watch("location") || "Location not specified"}
                        </p>

                        <p className="text-gray-500">
                            💼 {watch("experience") || "Fresher"}
                        </p>

                    </div>

                </div>

             </div>









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

        <p className="text-sm text-gray-500 mt-1">
            Separate skills with commas.
        </p>

          <input
            {...register("skills")}
            
            placeholder="React, Node.js, MongoDB"
            className="w-full border rounded-lg p-3"
          />

        <div className="flex flex-wrap gap-2 mt-4">

        {watch("skills")
            ?.split(",")
            .filter(Boolean)
            .map((skill) => (

                <span
                    key={skill}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                    {skill.trim()}
                </span>

            ))}

        </div>

        <textarea
            {...register("bio")}
            rows={6}
            placeholder="Write a short professional introduction about yourself..."
            className="w-full border rounded-lg p-3 resize-none"
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