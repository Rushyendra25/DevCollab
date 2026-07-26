import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const response =
                await getDashboardStats();

            setData(response);

        } catch (error) {

            console.error(error);

        }
    };

    if (!data) {

        return (
            <>
                <Navbar />
                <div className="max-w-7xl mx-auto py-20 text-center">
                    Loading dashboard...
                </div>
                <Footer />
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Hero */}

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white p-10 mb-10">

                    <h1 className="text-4xl font-bold">
                        Welcome back 👋
                    </h1>

                    <p className="mt-3 text-lg opacity-90">
                        Build your next amazing project with talented developers.
                    </p>

                    <Link
                        to="/projects/create"
                        className="inline-block mt-8 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
                    >
                        + Create Project
                    </Link>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Link >
                    <StatCard
                        title="Projects"
                        value={data.stats.projectsCreated}
                        emoji="📁"
                        link="/my-projects"

                    />
                    </Link>
                    <Link >
                    <StatCard
                        title="Applied"
                        value={data.stats.applicationsSent}
                        emoji="📨"
                        link="/my-applications"
                    />
                    </Link>

                    <Link>
                    <StatCard
                        title="Received"
                        value={data.stats.applicationsReceived}
                        emoji="👥"
                        link="/my-projects"
                    />
                    </Link>

                    <Link>
                    <StatCard
                        title="Accepted"
                        value={data.stats.acceptedApplications}
                        emoji="✅"
                        link="/my-applications"
                    />
                    </Link>

                </div>

                {/* Bottom */}

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Profile */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-xl font-bold">
                            Profile Completion
                        </h2>

                        <div className="w-full bg-gray-200 h-3 rounded-full mt-6">

                            <div
                                className="bg-indigo-600 h-3 rounded-full"
                                style={{
                                    width:
                                        `${data.stats.profileCompletion}%`,
                                }}
                            />

                        </div>

                        <p className="mt-4 text-lg font-semibold">

                            {data.stats.profileCompletion}%

                        </p>

                        {data.stats.profileCompletion < 100 && (

                            <Link
                                to="/profile"
                                className="inline-block mt-6 text-indigo-600 font-semibold"
                            >
                                Complete Profile →
                            </Link>

                        )}

                    </div>

                    {/* Recent Projects */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Recent Projects

                        </h2>

                        {data.recentProjects.length === 0 ? (

                            <p>No projects yet.</p>

                        ) : (

                            data.recentProjects.map((project) => (

                                <Link
                                    key={project._id}
                                    to={`/projects/${project._id}`}
                                    className="block border-b py-3 hover:text-indigo-600"
                                >
                                    {project.title}
                                </Link>

                            ))

                        )}

                    </div>

                    {/* Recent Applications */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <h2 className="text-xl font-bold mb-5">

                            Recent Applications

                        </h2>

                        {data.recentApplications.length === 0 ? (

                            <p>No applications yet.</p>

                        ) : (

                            data.recentApplications.map((application) => (

                                <div
                                    key={application._id}
                                    className="flex justify-between border-b py-3"
                                >

                                    <span>

                                        {application.project.title}

                                    </span>

                                    <StatusBadge
                                        status={application.status}
                                    />

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

function StatCard({
    title,
    value,
    emoji,
}) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-4xl">

                {emoji}

            </p>

            <h2 className="text-4xl font-bold mt-4">

                {value}

            </h2>

            <p className="text-gray-500 mt-2">

                {title}

            </p>

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
            className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}
        >

            {status}

        </span>

    );

}

export default Dashboard;