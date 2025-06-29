const batimentsModel = require('../models/batimentsModel');

module.exports = {
    getAll: (req, res) => {
        res.json(batimentsModel.getAll());
    },
    getByPole: (req, res) => {
        const pole = req.params.pole;
        res.json(batimentsModel.getByPole(pole));
    },
    getById: (req, res) => {
        const id = parseInt(req.params.id_bat);
        const batiment = batimentsModel.getById(id);
        if (batiment) {
            res.json(batiment);
        } else {
            res.status(404).send('Batiment not found');
        }
    },
    add: (req, res) => {
        const newBatiment = req.body;
        res.status(201).json(batimentsModel.add(newBatiment));
    },
    update: (req, res) => {
        const id = parseInt(req.params.id_bat);
        const updatedBatiment = req.body;
        const result = batimentsModel.update(id, updatedBatiment);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Batiment not found');
        }
    },
    delete: (req, res) => {
        const id = parseInt(req.params.id_bat);
        const result = batimentsModel.delete(id);
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).send('Batiment not found');
        }
    }
};