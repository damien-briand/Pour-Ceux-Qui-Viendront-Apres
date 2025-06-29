const projectModel = require('../models/projectModel');

module.exports = {
    getAll: (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const projects = projectModel.getAll(limit);
        const routes = [
            { method: "GET", path: "/project/" },
            { method: "GET", path: "/project/id/:id" },
            { method: "POST", path: "/project/" },
            { method: "PUT", path: "/project/:id_project" },
            { method: "DELETE", path: "/project/:id_project" },
            { method: "POST", path: "/project/:id_project/membres" },
            { method: "DELETE", path: "/project/:id_project/membres/:employeeId" }
        ];
        res.json({ routes, projects });
    },
    getByID: (req, res) => {
        const id = parseInt(req.params.id);
        const project = projectModel.getByID(id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).send('Project not found');
        }
    },
    add: (req, res) => {
        const newProject = req.body;
        const project = projectModel.add(newProject);
        res.status(201).json(project);
    },
    update: (req, res) => {
        const id = parseInt(req.params.id_project);
        const updatedProject = req.body;
        const result = projectModel.update(id, updatedProject);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Project not found');
        }
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id_project);
        const result = projectModel.delete(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Project not found');
        }
    },
    addMemberToProject: (req, res) => {
        const projectId = parseInt(req.params.id_project);
        const member = req.body;
        const project = projectModel.addMemberToProject(projectId, member);
        if (project) {
            res.json(project);
        } else {
            res.status(404).send('Project not found');
        }
    },
    removeMemberFromProject: (req, res) => {
        const projectId = parseInt(req.params.id_project);
        const employeeId = parseInt(req.params.employeeId);
        const project = projectModel.removeMemberFromProject(projectId, employeeId);
        if (project) {
            res.json(project);
        } else {
            res.status(404).send('Project not found');
        }
    }
};