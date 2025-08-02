const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  clickCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', urlSchema);
