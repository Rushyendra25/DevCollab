import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FaUsers, FaProjectDiagram, FaHandshake } from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Find teammates.
            <br />
            <span className="text-indigo-600">
              Build amazing projects.
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
            DevCollab helps developers connect, build teams,
            and collaborate on exciting software projects.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              to="/projects"
              className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100 transition"
            >
              Explore Projects
            </Link>

          </div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why DevCollab?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="shadow rounded-2xl p-8 text-center">

            <FaUsers
              className="text-indigo-600 mx-auto"
              size={50}
            />

            <h3 className="text-2xl font-bold mt-6">
              Find Developers
            </h3>

            <p className="mt-4 text-gray-600">
              Connect with developers who have the skills your project needs.
            </p>

          </div>

          <div className="shadow rounded-2xl p-8 text-center">

            <FaProjectDiagram
              className="text-indigo-600 mx-auto"
              size={50}
            />

            <h3 className="text-2xl font-bold mt-6">
              Create Projects
            </h3>

            <p className="mt-4 text-gray-600">
              Share your ideas and recruit talented teammates.
            </p>

          </div>

          <div className="shadow rounded-2xl p-8 text-center">

            <FaHandshake
              className="text-indigo-600 mx-auto"
              size={50}
            />

            <h3 className="text-2xl font-bold mt-6">
              Collaborate
            </h3>

            <p className="mt-4 text-gray-600">
              Build together and turn ideas into real applications.
            </p>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;