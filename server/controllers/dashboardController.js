import Project from "../models/Project.js";
import Application from "../models/Application.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import { calculateProfileCompletion } from "../utils/profileCompletion.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const projectsCreated = await Project.countDocuments({
      owner: userId,
    });

    const applicationsSent = await Application.countDocuments({
      applicant: userId,
    });

    const applicationsReceived = await Application.aggregate([
        {
          $lookup: {
            from: "projects",
            localField: "project",
            foreignField: "_id",
            as: "project",
          },
        },
        { $unwind: "$project" },
        {
          $match: {
            "project.owner": new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $count: "total",
        },
      ]);

    const acceptedApplications = await Application.aggregate([
        {
          $lookup: {
            from: "projects",
            localField: "project",
            foreignField: "_id",
            as: "project",
          },
        },
        {
          $unwind: "$project",
        },
        {
          $match: {
            "project.owner": new mongoose.Types.ObjectId(userId),
            status: "Accepted",
          },
        },
        {
          $count: "total",
        },
      ]);

    const openProjects = await Project.countDocuments({
      owner: userId,
      status: "Open",
    });

    const recentProjects = await Project.find({
      owner: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentApplications = await Application.find({
      applicant: userId,
    })
      .populate("project", "title")
      .sort({ createdAt: -1 })
      .limit(5);

      const user = await User.findById(userId);

      const completion = calculateProfileCompletion(user);
    
    res.json({
      success: true,

      stats: {
        projectsCreated,
        applicationsSent,
        applicationsReceived:
            applicationsReceived[0]?.total || 0,
        acceptedApplications:
            acceptedApplications[0]?.total || 0,
        openProjects,
        profileCompletion: completion,
    },

      recentProjects,

      recentApplications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};