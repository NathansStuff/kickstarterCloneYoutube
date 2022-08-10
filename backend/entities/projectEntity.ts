import { ProjectType } from '../types/projectTypes';

// sanitize input for project entity
export function sanitizeProject(project: ProjectType): ProjectType {
    return {
        ...project,
        title: sanitize(project.title),
    };
}
function sanitize(title: string): string {

    throw new Error("Function not implemented.");
}

