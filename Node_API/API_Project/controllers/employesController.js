const employesModel = require('../models/employesModel');

module.exports = {
    getAll: (req, res) => {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        if (limit > 200) {
            res.status(400).send('Limit should be less than 200');
            return;
        }
        const attribute = req.query.attribut;
        const search = req.query.search;
        let employes;
        if (attribute && search) {
            employes = employesModel.getByAttribute(attribute, search);
        } else {
            employes = employesModel.getAll(offset, limit);
        }
        const routes = [
            { method: "GET", path: "/employe/" },
            { method: "GET", path: "/employe?limit=[10,200]&offset=[0,200]" },
            { method: "GET", path: "/employe?attribut=[attribute]&search=[value]" },
            { method: "POST", path: "/employe/" },
            { method: "PUT", path: "/employe/:id" },
            { method: "DELETE", path: "/employe/:id" }
        ];
        res.json({ routes, employes });
    },
    add: (req, res) => {
        const newEmploye = req.body;
        res.status(201).json(employesModel.add(newEmploye));
    },
    update: (req, res) => {
        const id = parseInt(req.params.id);
        const updatedEmploye = req.body;
        const result = employesModel.update(id, updatedEmploye);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Employe not found');
        }
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id);
        const result = employesModel.delete(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Employe not found');
        }
    }
};