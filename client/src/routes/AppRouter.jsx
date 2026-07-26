import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import CreateProject from "../pages/CreateProject";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ProjectDetails from "../pages/ProjectDetails";
import MyProjects from "../pages/MyProjects";
import ManageApplications from "../pages/ManageApplications";
import MyApplications from "../pages/MyApplications"
import { AuthProvider } from "../context/AuthContext";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
                }/>
        <Route
            path="/projects/:id"
            element={
            <ProtectedRoute>
            <ProjectDetails />
            </ProtectedRoute>
            }
            />

            <Route
            path="/my-projects"
            element={
            <ProtectedRoute>
            <MyProjects />
            </ProtectedRoute>
            }
            />

        <Route
        path="/projects/:id/applications"
        element={ <ProtectedRoute><ManageApplications /></ProtectedRoute>}
        />

        <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        <Route
        path="/my-applications"
        element={<ProtectedRoute><MyApplications /></ProtectedRoute>}
        />

        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />

        <Route path="/projects/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default AppRouter;