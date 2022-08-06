const express = require('express');
const routes = express.Router();
import { Response, Request } from 'express';

routes.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Get All Projects' });
});
routes.post('/', (req: Request, res: Response) => {
    res.json({ message: 'Create a Project' });
});
routes.get('/:id', (req: Request, res: Response) => {
    res.json({ message: `Get Project ${req.params.id}` });
});
routes.put('/:id', (req: Request, res: Response) => {
    res.json({ message: `Update Project ${req.params.id}` });
});
routes.delete('/:id', (req: Request, res: Response) => {
    res.json({ message: `Delete Project ${req.params.id}` });
});

module.exports = routes;
