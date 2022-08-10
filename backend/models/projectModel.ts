import { model } from 'mongoose';
import projectSchema, { IProjectSchema } from '../schemas/projectSchema';

const ProjectModel = model<IProjectSchema>('Project', projectSchema);

export default ProjectModel;
