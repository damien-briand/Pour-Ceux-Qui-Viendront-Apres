const teamsModel = require('../models/teamsModel');

module.exports = {
    getAll: (req, res) => {
        const teams = teamsModel.getAll();
        const routes = [
            { method: "GET", path: "/equipe/" },
            { method: "GET", path: "/equipe/:id_team" },
            { method: "POST", path: "/equipe/" },
            { method: "PUT", path: "/equipe/:id_team" },
            { method: "DELETE", path: "/equipe/:id_team" },
            { method: "POST", path: "/equipe/:id_team/employees" },
            { method: "DELETE", path: "/equipe/:id_team/employees/:employeeId" },
            { method: "GET", path: "/equipe/batiment/:batiment" }
        ];
        res.json({ routes , teams });
    },
    getById: (req, res) => {
        const id = parseInt(req.params.id_team);
        const team = teamsModel.getById(id);
        if (team) {
            res.json(team);
        } else {
            res.status(404).send('Team not found');
        }
    },
    add: (req, res) => {
        const newTeam = req.body;
        res.status(201).json(teamsModel.add(newTeam));
    },
    update: (req, res) => {
        const id = parseInt(req.params.id_team);
        const updatedTeam = req.body;
        const result = teamsModel.update(id, updatedTeam);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Team not found');
        }
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id_team);
        const result = teamsModel.delete(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Team not found');
        }
    },
    addEmployeeToTeam: (req, res) => {
        const teamId = parseInt(req.params.id_team);
        const employeeId = parseInt(req.body.employeeId);
        const team = teamsModel.addEmployeeToTeam(teamId, employeeId);
        if (team) {
            res.json(team);
        } else {
            res.status(404).send('Team or employee not found');
        }
    },
    removeEmployeeFromTeam: (req, res) => {
        const teamId = parseInt(req.params.id_team);
        const employeeId = parseInt(req.params.employeeId);
        const team = teamsModel.removeEmployeeFromTeam(teamId, employeeId);
        if (team) {
            res.json(team);
        } else {
            res.status(404).send('Team or employee not found');
        }
    },
    getByBatiment: (req, res) => {
        const batiment = req.params.batiment;
        const teams = teamsModel.getByBatiment(batiment);
        if (teams.length > 0) {
            res.json(teams);
        } else {
            res.status(404).send('No teams found for this batiment');
        }
    }
};