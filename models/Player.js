const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, default: '/images/default-player.png' },
  socials: {
    twitter: String,
    instagram: String,
    twitch: String
  }
});

module.exports = mongoose.model('Player', playerSchema);
