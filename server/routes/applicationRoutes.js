import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  applyToProject,getProjectApplications, updateApplicationStatus
} from "../controllers/applicationController.js";

import {
    getMyApplications,
    withdrawApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:projectId", authMiddleware, applyToProject);

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

  router.get(
    "/my",
    authMiddleware,
    getMyApplications
);

router.delete(
    "/:applicationId",
    authMiddleware,
    withdrawApplication
);

export default router;