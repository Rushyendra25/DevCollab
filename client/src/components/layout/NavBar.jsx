import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-indigo-600"
        >
          DevCollab
        </Link>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;