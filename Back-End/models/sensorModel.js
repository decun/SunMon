// models/sensorModel.js
const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema(
  {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
