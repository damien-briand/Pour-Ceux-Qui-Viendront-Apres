const express = require('express');
const router = express.Router();
const batimentsController = require('../controllers/batimentsController');

router.get('/', batimentsController.getAll);
router.get('/:pole', batimentsController.getByPole);
router.get('/:id_bat', batimentsController.getById);
router.post('/', batimentsController.add);
router.put('/:id_bat', batimentsController.update);
router.delete('/:id_bat', batimentsController.delete);

module.exports = router;