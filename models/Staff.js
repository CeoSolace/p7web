const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, default: '/images/default-staff.png' },
  socials: {
    twitter: String,
    instagram: String
  }
});

module.exports = mongoose.model('Staff', staffSchema);
