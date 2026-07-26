import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { applyToProject } from "../controllers/applicationController.js";
import {getProjectApplications} from "../controllers/applicationController.js";
import { updateApplicationStatus } from "../controllers/applicationController.js";
const router = express.Router();

router.post("/register", registerUser);



router.post("/login", loginUser);

router.get(
    "/project/:projectId",
    authMiddleware,
    getProjectApplications
  );
  
  router.put(
    "/:applicationId",
    authMiddleware,
    updateApplicationStatus
  );
  router.post("/:projectId", authMiddleware, applyToProject);

export default router;