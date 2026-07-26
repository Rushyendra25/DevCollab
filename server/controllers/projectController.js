import Project from "../models/Project.js";

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