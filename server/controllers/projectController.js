import Project from "../models/Project.js";
import Application from "../models/Application.js";
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
      teamSize,
    } = req.body;

    if (
      !title ||
      !description ||
      !requiredSkills ||
      !teamSize
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const project = await Project.create({
      title,
      description,
      requiredSkills,
      teamSize,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name email github")
      .sort({ createdAt: -1 });

    const projectsWithApplications = await Promise.all(
      projects.map(async (project) => {
        const applications = await Application.find({
          project: project._id,
        });

        return {
          ...project.toObject(),
          applicantCount: applications.length,
          applicants: applications.map((app) =>
            app.applicant.toString()
          ),
        };
      })
    );

    res.json({
      success: true,
      projects: projectsWithApplications,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProjectById = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id)
        .populate("owner", "name email github");
  
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
  
      const applicantCount = await Application.countDocuments({
        project: project._id,
      });
  
      res.json({
        success: true,
        project: {
          ...project.toObject(),
          applicantCount,
        },
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };

  export default getProjectById;


  export const getMyProjects = async (req, res) => {
    try {
      const projects = await Project.find({
        owner: req.user.id,
      })
        .populate("owner", "name email")
        .sort({ createdAt: -1 });
  
      const projectsWithApplications = await Promise.all(
        projects.map(async (project) => {
          const applicantCount = await Application.countDocuments({
            project: project._id,
          });
  
          return {
            ...project.toObject(),
            applicantCount,
          };
        })
      );
  
      res.json({
        success: true,
        projects: projectsWithApplications,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };