const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAll);
router.get('/id/:id', projectController.getByID);
router.post('/', projectController.add);
router.put('/:id_project', projectController.update);
router.delete('/:id_project', projectController.delete);
router.post('/:id_project/membres', projectController.addMemberToProject);
router.delete('/:id_project/membres/:employeeId', projectController.removeMemberFromProject);

module.exports = router;