import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold text-indigo-600"
        >
          DevCollab
        </Link>

        {!user ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-5">

            <span className="font-semibold">
              {user.name}
            </span>

            <Link
              to="/dashboard"
              className="text-indigo-600"
            >
              Dashboard
            </Link>

            <Link
            to="/my-projects"
            className="hover:text-indigo-600"
            >
            My Projects
            </Link>


            <Link
            to="/my-applications"
            className="hover:text-indigo-600"
            >
            My Applications
            </Link>


            <Link
            to="/profile"
            className="hover:text-indigo-600"
            >
            My Profile
            </Link>
            
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;