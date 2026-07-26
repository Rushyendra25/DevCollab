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

        {applications.map((application) => (

          <div
            key={application._id}
            className="bg-white shadow rounded-2xl p-6 mb-6"
          >

            <h2 className="text-2xl font-bold">
              {application.applicant.name}
            </h2>

            <p>{application.applicant.email}</p>

            <p className="mt-2">
              Status:
              <strong> {application.status}</strong>
            </p>

            {application.status === "Pending" && (

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    updateStatus(
                      application._id,
                      "Accepted"
                    )
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-xl"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      application._id,
                      "Rejected"
                    )
                  }
                  className="bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  Reject
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

      <Footer />

    </>
  );
}

export default ManageApplications;