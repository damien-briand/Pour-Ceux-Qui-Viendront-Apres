const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.get('/project/:projectId', taskController.getByProjectId);
router.post('/', taskController.add);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;