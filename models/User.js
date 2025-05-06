const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  usercode: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
