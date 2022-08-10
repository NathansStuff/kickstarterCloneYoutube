import ProjectModel from '../models/projectModel';
import { IProjectSchema } from '../models/schemas/projectSchema';
import { ProjectType } from '../types/projectTypes';
import HttpException from '../utils/httpException';

export async function createProject(
    project: ProjectType
): Promise<ProjectType> {
    try {
        const createdProject = await ProjectModel.create(project);
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
    const updatedProject = await ProjectModel.findByIdAndUpdate(
        projectId,
        project,
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
