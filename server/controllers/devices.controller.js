const deviceModel = require('../models/device.model');
const gatewayModel = require('../models/gateways.model');
const { validationResult,body } = require('express-validator/check');
const {isValidDate} = require('../customValidators/customValidators')
const deviceController = {};

deviceController.getDevices = async (req, res) => {
  const devices = await deviceModel.find();
  res.json(devices);
};

deviceController.createDevice = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { id } = req.params;
    const gateway = await gatewayModel.findById(id);
    if(gateway.devices.length >= 10) {
      res.status(422).json({ errors: 'This gateway has the limit of allowed devices' });
      return;
    }
    
    const device = new deviceModel({ ...req.body, gateway: id });
    await device.save();
    
    gateway.devices.push(device);
    await gateway.save();
  
    res.json({
      status: 'device saved success',
    });

  } catch (error) {
    return next(error);
  }
};

deviceController.getDevice = async (req, res) => {
  const device = await deviceModel.findById(req.params.id);
  res.json(device);
};

deviceController.updateDevice = async (req, res) => {
  const { id } = req.params;
  await deviceModel.findByIdAndUpdate(
    id,
    { $set: { ...req.body } },
    { new: true }
  );
  res.json({ status: 'device update' });
};

deviceController.deleteDevice = async (req, res) => {
  const { id } = req.params;
  const device = await deviceModel.findById(id);
  await gatewayModel.updateOne( {_id: device.gateway}, { $pullAll: {devices: [device._id] } } )
  await deviceModel.findOneAndRemove(id);
  res.json({ status: 'device deleted' });
};

deviceController.validate = (method) => {
  switch (method) {
    case 'createDevice': {
      return [
        body('uid', 'uid is required').exists(),
        body('vendor', 'vendor is required').exists(),
        body('date_created', 'date_created is required')
          .exists()
          .custom(date => {
            return isValidDate(date);
          })
          .withMessage('date_created is invalid'),
      ];
    }
  }
};

module.exports = deviceController;
