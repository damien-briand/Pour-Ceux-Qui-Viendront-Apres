const express = require('express');
const router = express.Router();
const employesController = require('../controllers/employesController');

router.get('/', employesController.getAll);
router.post('/', employesController.add);
router.put('/:id', employesController.update);
router.delete('/:id', employesController.delete);

module.exports = router;