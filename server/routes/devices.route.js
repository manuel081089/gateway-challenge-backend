const express = require('express');
const deviceController = require('../controllers/devices.controller')
const router = express.Router();

router.get('/', deviceController.getDevices)
router.post('/:id',deviceController.validate('createDevice'), deviceController.createDevice)
router.get('/:id', deviceController.getDevice)
router.put('/:id', deviceController.updateDevice)
router.delete('/:id', deviceController.deleteDevice)

module.exports = router;
