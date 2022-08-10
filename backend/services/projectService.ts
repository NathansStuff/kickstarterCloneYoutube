import { body, validationResult } from 'express-validator';
import ProjectModel from '../models/projectModel';
import { IProjectSchema } from '../schemas/projectSchema';
import { ProjectType } from '../types/projectTypes';
import HttpException from '../utils/httpException';

export async function createProject(
    project: ProjectType
): Promise<ProjectType> {
    try {
        const sanitizedProject = sanitizeProject(project);

        const createdProject = await ProjectModel.create(sanitizedProject);
        if (!createdProject) {
            throw new Error('Project not created');
        }
        return createdProject.toObject();
    } catch (err) {
        if (err.code === 11000) {
            throw new HttpException('Project already exists', 400);
        }
        throw new Error(`Error creating project: ${err.message}`);
    }
}

export async function getProjects(): Promise<ProjectType[]> {
    const projects = await ProjectModel.find();
    return projects.map(project => project.toObject());
}

export async function getProjectById(
    projectId: string
): Promise<IProjectSchema> {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
        throw new Error('Project not found');
    }
    return project;
}

export async function updateProject(
    projectId: string,
    project: ProjectType
): Promise<ProjectType> {
    const sanitizedProject = sanitizeProject(project);
    const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectId,
        sanitizedProject,
        { new: true }
    );
    if (!updatedProject) {
        throw new Error('Project not found');
    }
    return updatedProject.toObject();
}

export async function deleteProject(projectId: string): Promise<void> {
    await ProjectModel.findByIdAndDelete(projectId);
}

function sanitizeProject(project: ProjectType): ProjectType {
    let sanitizedProject = <ProjectType>{};

    // Title validation
    let title = project.title;
    // Types
    if (title === undefined) {
        throw new HttpException('Title is required', 400);
    }
    if (typeof title !== 'string') {
        throw new HttpException('Title must be a string', 400);
    }
    // Attribues
    title = title.trim();
    if (title.length < 3) {
        throw new HttpException('Title must be at least 3 characters', 400);
    }
    if (title.length > 50) {
        throw new HttpException('Title must be less than 50 characters', 400);
    }
    sanitizedProject.title = title;

    return sanitizedProject;
}
