const taskModel = require('../models/taskModel');

module.exports = {
    getAll: (req, res) => {
        res.json({
            routes: [
                { method: "GET", path: "/task/" },
                { method: "GET", path: "/task/:id" },
                { method: "GET", path: "/task/project/:projectId" },
                { method: "POST", path: "/task/" },
                { method: "PUT", path: "/task/:id" },
                { method: "DELETE", path: "/task/:id" }
            ],
            tasks: taskModel.getAll()
        });
    },
    getById: (req, res) => {
        const id = parseInt(req.params.id);
        const task = taskModel.getById(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).send('Task not found');
        }
    },
    getByProjectId: (req, res) => {
        const projectId = parseInt(req.params.projectId);
        const tasks = taskModel.getByProjectId(projectId);
        if (tasks.length > 0) {
            res.json(tasks);
        } else {
            res.status(404).send('No tasks found for this project');
        }
    },
    add: (req, res) => {
        const newTask = req.body;
        res.status(201).json(taskModel.add(newTask));
    },
    update: (req, res) => {
        const id = parseInt(req.params.id);
        const updatedTask = req.body;
        const result = taskModel.update(id, updatedTask);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Task not found');
        }
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id);
        const result = taskModel.delete(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Task not found');
        }
    }
};