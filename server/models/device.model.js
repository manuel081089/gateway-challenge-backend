const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema(
  {
    uid: { type: Number, required: '{PATH} is required!' },
    vendor: { type: String, required: '{PATH} is required!' },
    date_created: { type: String, required: '{PATH} is required!' }, // validation
    status: { type: String, required: '{PATH} is required!' }, // only online/offline.
    gateway: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gateway'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
