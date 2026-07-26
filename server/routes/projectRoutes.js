import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import getProjectById from "../controllers/projectController.js"
import { getMyProjects } from "../controllers/projectController.js";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectController.js";
import {
    updateProject,deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

// Public route
router.get("/", getAllProjects);
router.get("/my/projects", authMiddleware, getMyProjects);
router.get("/:id", getProjectById);
// Protected route
router.post("/", authMiddleware, createProject);
router.put(
    "/:id",
    authMiddleware,
    updateProject
);
router.delete(
    "/:id",
    authMiddleware,
    deleteProject
);

export default router;