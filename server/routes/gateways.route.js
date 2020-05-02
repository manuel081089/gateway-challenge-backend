const express = require('express');
const gatewayController = require('../controllers/gateways.controller')
const router = express.Router();

router.get('/', gatewayController.getGateways)
router.post('/', gatewayController.validate('createGateway'), gatewayController.createGateway)
router.get('/:id', gatewayController.getGateway)
router.put('/:id', gatewayController.updateGateway)
router.delete('/:id', gatewayController.deleteGateway)
router.get('/:id/devices', gatewayController.devicesByGateway)

module.exports = router;