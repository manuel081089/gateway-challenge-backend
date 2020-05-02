const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const gatewaySchema = new Schema(
  {
    serial_number: { type: String, required: '{PATH} is required!', unique: true  }, // TODO: validation unique
    name: { type: String, required: '{PATH} is required!' },
    address_ip: { type: String, required: '{PATH} is required!' }, // validation
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  },
  { timestamps: true }
);

gatewaySchema.plugin(uniqueValidator, { message: 'Error, {PATH} to be unique.' });

module.exports = mongoose.model('Gateway', gatewaySchema);
