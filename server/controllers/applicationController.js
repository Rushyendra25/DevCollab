import Application from "../models/Application.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const applyToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);

    const profileComplete =
        user.role &&
        user.location &&
        user.bio &&
        user.experience &&
        user.skills &&
        user.skills.length >= 3 &&
        (user.github || user.portfolio);

    if (!profileComplete) {
        return res.status(400).json({
            success: false,
            message: "Complete your profile before applying to projects.",
        });
    }

    // Check if project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Prevent owner from applying to own project
    if (project.owner.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot apply to your own project",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      project: projectId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this project",
      });
    }

    const application = await Application.create({
      project: projectId,
      applicant: userId,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const getProjectApplications = async (req, res) => {
  try {
    const { projectId } = req.params;

    const applications = await Application.find({
      project: projectId,
    })
    .populate(
        "applicant",
        "name email role location experience github linkedin portfolio skills bio"
    )
      .populate("project", "title");

    res.json({
      success: true,
      applications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const updateApplicationStatus = async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;
  
      const application = await Application.findById(applicationId);
  
      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }
  
      application.status = status;
  
      await application.save();
  
      return res.json({
        success: true,
        message: `Application ${status.toLowerCase()} successfully`,
        application,
    
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };


  export const getMyApplications = async (req, res) => {
    try {
  
      const applications = await Application.find({
        applicant: req.user.id,
      })
        .populate({
          path: "project",
          populate: {
            path: "owner",
            select: "name",
          },
        })
        .sort({ createdAt: -1 });
  
      res.json({
        success: true,
        applications,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };


  export const withdrawApplication = async (req, res) => {

    try {
  
      const application = await Application.findById(
        req.params.applicationId
      );
  
      if (!application) {
  
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
  
      }
  
      if (
        application.applicant.toString() !== req.user.id
      ) {
  
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        });
  
      }
  
      if (application.status !== "Pending") {
  
        return res.status(400).json({
          success: false,
          message:
            "Only pending applications can be withdrawn.",
        });
  
      }
  
      await application.deleteOne();
  
      res.json({
        success: true,
        message: "Application withdrawn successfully",
      });
  
    } catch (error) {
  
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
  
    }
  
  };