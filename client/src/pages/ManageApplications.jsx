import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  getProjectApplications,
  updateApplicationStatus,
} from "../services/projectService";

function ManageApplications() {

  const { id } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await getProjectApplications(id);

      setApplications(response.applications);

    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const response = await updateApplicationStatus(
        applicationId,
        status
      );

      toast.success(response.message);

      loadApplications();

    } catch (error) {
      toast.error("Unable to update");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-10">
          Applications

        </h1>


        {applications.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-12 text-center">

        <div className="text-6xl mb-4">📭</div>

        <h2 className="text-2xl font-bold">
            No Applications Yet
        </h2>

        <p className="text-gray-500 mt-3">
            This project hasn't received any applications yet.
        </p>

        </div>

        ) : (
        <div className="space-y-6">
        {applications.map((application) => (

          <div
            key={application._id}
            className="bg-white shadow rounded-2xl p-6 mb-6"
          >

            <div className="flex justify-between items-start">

            <div>

                <h2 className="text-2xl font-bold">
                    {application.applicant.name}
                </h2>

                <p className="text-indigo-600 font-medium">
                    {application.applicant.role}
                </p>

            </div>

            <span className="px-3 py-1 rounded-full bg-gray-100">
                {application.status}
            </span>

            </div>

            <p className="mt-4">
            📍 {application.applicant.location || "Not specified"}
            </p>

            <p className="mt-2">
            ⭐ {application.applicant.experience || "Fresher"}
            </p>


            <div className="flex flex-wrap gap-2 mt-5">

                {application.applicant.skills?.map((skill) => (

                    <span
                        key={skill}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                        {skill}
                    </span>

                ))}

            </div>


            <div className="mt-6 space-y-2">

                    {application.applicant.github && (
                        <p>
                            🐙
                            <a
                                href={application.applicant.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
                            >
                                GitHub
                            </a>
                        </p>
                    )}

                    {application.applicant.linkedin && (
                        <p>
                            💼
                            <a
                                href={application.applicant.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
                            >
                                Linkedin
                            </a>
                        </p>
                    )}

                    {application.applicant.portfolio && (
                        <p>
                            🌐
                            <a
                                href={application.applicant.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition"
                            >
                                Portfolio
                            </a>
                        </p>
                    )}

                </div>
                


                {application.applicant.bio && (

                    <div className="mt-6">

                        <h3 className="font-semibold mb-2">
                            About
                        </h3>

                        <p className="text-gray-600">
                            {application.applicant.bio}
                        </p>

                    </div>

                )}

            {application.status === "Pending" && (

            <div className="flex gap-4 mt-8">

            <button
                onClick={() =>
                    updateStatus(application._id, "Rejected")
                }
                className="flex-1 border border-red-500 text-red-600 rounded-xl py-2 hover:bg-red-50 transition"
            >
                Reject
            </button>

            <button
                onClick={() =>
                    updateStatus(application._id, "Accepted")
                }
                className="flex-1 bg-green-600 text-white rounded-xl py-2 hover:bg-green-700 transition"
            >
                Accept
            </button>

            </div>

            )}

          </div>
        
        ))}
     </div>
        )}
      </div>

      <Footer />

    </>
  );
}

export default ManageApplications;