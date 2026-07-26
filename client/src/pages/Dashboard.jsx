import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import StatCard from "../components/common/StatCard";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold">
          Welcome Back,
          <span className="text-indigo-600">
            {" "} {user?.name}
          </span>
          👋
        </h1>

        <p className="text-gray-600 mt-2">
          Build something amazing today.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <StatCard
            title="Projects"
            value="0"
          />

          <StatCard
            title="Applications"
            value="0"
          />

          <StatCard
            title="Teams"
            value="0"
          />

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-5">

            <Link
              to="/projects/create"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              + Create Project
            </Link>

            <Link
              to="/projects"
              className="border px-6 py-3 rounded-xl"
            >
              Browse Projects
            </Link>

            <Link
              to="/profile"
              className="border px-6 py-3 rounded-xl"
            >
              Update Profile
            </Link>

          </div>

        </div>

        <div className="mt-14">

          <h2 className="text-2xl font-bold">
            Recent Activity
          </h2>

          <div className="bg-white shadow rounded-2xl mt-5 p-8">

            <p className="text-gray-500">
              No recent activity.
            </p>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Dashboard;