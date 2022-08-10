import { Response, Request } from 'express';
import { checkIsValidObjectId } from '../database/db';
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
import {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} from '../services/projectService';
import { ProjectType } from '../types/projectTypes';

const Project = require('../models/projectModel');

//@desc Get all projects
//@route GET /api/projects
//@access Public
const getProjectsHandler = asyncHandler(async (req: Request, res: Response) => {
    const projects = await getProjects();
    if (!projects) {
        throw new Error('Projects not found');
    }
    res.status(200).json(projects);
});

//@desc Create a new project
//@route POST /api/projects
//@access Private
const createProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const createdProject = await createProject(req.body);

        res.status(200).json(createdProject);
    }
);

//@desc Get a project by id
//@route GET /api/projects/:id
//@access Public
const getProjectHandler = asyncHandler(async (req: Request, res: Response) => {
    checkIsValidObjectId(req.params.id);

    const project = await getProjectById(req.params.id);
    res.status(200).json(project);
});

//@desc Delete a project by id
//@route DELETE /api/projects/:id
//@access Private
const deleteProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        checkIsValidObjectId(req.params.id);

        await deleteProject(req.params.id);
        res.status(200).json({ message: 'Project deleted' });
    }
);

//@desc Update a project by id
//@route PUT /api/projects/:id
//@access Private
const updateProjectHandler = asyncHandler(
    async (req: Request, res: Response) => {
        checkIsValidObjectId(req.params.id);

        const updatedProject = await updateProject(req.params.id, req.body);
        res.status(200).json(updatedProject);
    }
);

module.exports = {
    getProjectsHandler,
    createProjectHandler,
    getProjectHandler,
    deleteProjectHandler,
    updateProjectHandler,
};
