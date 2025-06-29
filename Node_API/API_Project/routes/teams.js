const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController');

router.get('/', teamsController.getAll);
router.get('/:id_team', teamsController.getById);
router.post('/', teamsController.add);
router.put('/:id_team', teamsController.update);
router.delete('/:id_team', teamsController.delete);
router.post('/:id_team/employees', teamsController.addEmployeeToTeam);
router.delete('/:id_team/employees/:employeeId', teamsController.removeEmployeeFromTeam);
router.get('/batiment/:batiment', teamsController.getByBatiment);

module.exports = router;