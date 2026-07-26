import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  getMyApplications,
  withdrawApplication,
} from "../services/applicationService";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await getMyApplications();
      setApplications(response.applications);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdraw = async (id) => {
    if (!window.confirm("Withdraw this application?")) return;

    try {
      const response = await withdrawApplication(id);

      toast.success(response.message);

      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to withdraw application"
      );
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((application) =>
      application.project.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [applications, search]);

  const total = applications.length;
  const pending = applications.filter(
    (a) => a.status === "Pending"
  ).length;
  const accepted = applications.filter(
    (a) => a.status === "Accepted"
  ).length;
  const rejected = applications.filter(
    (a) => a.status === "Rejected"
  ).length;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Applications
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <SummaryCard title="Total" value={total} />

          <SummaryCard
            title="Pending"
            value={pending}
            color="text-yellow-600"
          />

          <SummaryCard
            title="Accepted"
            value={accepted}
            color="text-green-600"
          />

          <SummaryCard
            title="Rejected"
            value={rejected}
            color="text-red-600"
          />

        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by project title..."
          className="w-full md:w-96 border rounded-xl p-3 mb-8"
        />

        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">
              No Applications Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start applying to projects to track them here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {filteredApplications.map((application) => (

              <div
                key={application._id}
                className="bg-white rounded-2xl shadow p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {application.project.title}
                    </h2>

                    <p className="text-gray-600">
                      Owner:{" "}
                      {application.project.owner.name}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Applied on{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <StatusBadge
                    status={application.status}
                  />

                </div>

                <div className="flex flex-wrap gap-2 mt-5">

                  {application.project.requiredSkills?.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

                <div className="flex gap-3 mt-8">

                  <Link
                    to={`/projects/${application.project._id}`}
                    className="flex-1 border rounded-xl text-center py-2 hover:bg-gray-100"
                  >
                    View Project
                  </Link>

                  {application.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleWithdraw(application._id)
                      }
                      className="flex-1 bg-red-600 text-white rounded-xl py-2 hover:bg-red-700"
                    >
                      Withdraw
                    </button>
                  )}

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

function SummaryCard({
  title,
  value,
  color = "text-indigo-600",
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <p className="text-gray-500">{title}</p>

      <h2 className={`text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",
    Accepted:
      "bg-green-100 text-green-700",
    Rejected:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default MyApplications;