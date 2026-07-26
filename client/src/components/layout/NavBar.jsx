import { Link ,NavLink} from "react-router-dom";
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

            <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700 hover:text-indigo-600 transition"
            }
            >
                Dashboard
            </NavLink>

            <NavLink
                to="/my-projects"
                className={({ isActive }) =>
                    isActive
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-600 transition"
                }
            >
                My Projects
            </NavLink>


            <NavLink
                to="/my-applications"
                className={({ isActive }) =>
                    isActive
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-600 transition"
                }
            >
                My Applications
            </NavLink>

            <NavLink
                to="/projects"
                className={({ isActive }) =>
                    isActive
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-600 transition"
                }
            >
                Explore Projects
            </NavLink>


            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    isActive
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-600 transition"
                }
            >
                My Profile
            </NavLink>
            
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