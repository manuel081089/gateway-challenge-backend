const gatewayModel = require('../models/gateways.model');
const { body, validationResult } = require('express-validator/check');
const {validateIPaddress} = require('../customValidators/customValidators')
const gatewayController = {};

gatewayController.getGateways = async (req, res) => {
  const gateways = await gatewayModel.find();
  res.json(gateways);
};

gatewayController.createGateway = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const gateway = new gatewayModel(req.body);

    await gatewayModel.findOne({serial_number: req.body.serial_number}, (err,obj) => { 
      if(obj) {
        res.status(422).json({ errors: "This serial number already exists" });
        return;
      }
    })

    await gateway.save();
    res.json({
      status: 'gateway saved success',
    });
  } catch (error) {
    return next(error);
  }
};

gatewayController.getGateway = async (req, res) => {
  const gateway = await gatewayModel.findById(req.params.id);
  res.json(gateway);
};

gatewayController.updateGateway = async (req, res) => {
  const { id } = req.params;
  await gatewayModel.findByIdAndUpdate(
    id,
    { $set: { ...req.body } },
    { new: true }
  );
  res.json({ status: 'gateway update' });
};

gatewayController.deleteGateway = async (req, res) => {
  const { id } = req.params;
  await gatewayModel.findByIdAndRemove(id);
  res.json({ status: 'gateway deleted' });
};

gatewayController.devicesByGateway = async (req, res) => {
  const { id } = req.params;
  const gateway = await gatewayModel.findById(id).populate('devices');

  res.json(gateway.devices);
};

gatewayController.validate = (method) => {
  switch (method) {
    case 'createGateway': {
      return [
        body('serial_number', 'serial_number is required').exists(),
        body('name', 'name is required').exists(),
        body('address_ip', 'address_ip is required').exists().custom((ipaddress) => {
          return validateIPaddress(ipaddress);
        }).withMessage('address_ip is invalid'), //IP validation
      ];
    }
  }
};

module.exports = gatewayController;
