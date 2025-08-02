const express = require('express');
const router = express.Router();
const Url = require('../models/url');
const Click = require('../models/Click');
const crypto = require('crypto');

const isValidShortcode = (code) => /^[a-zA-Z0-9]{4,10}$/.test(code);

router.post('/shorten', async (req, res) => {
  const { originalUrl, validity, customCode } = req.body;
  if (!originalUrl || !/^https?:\/\/.+\..+/.test(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  let shortCode = customCode || crypto.randomBytes(4).toString('hex');
  if (!isValidShortcode(shortCode)) {
    return res.status(400).json({ error: 'Shortcode must be alphanumeric (4-10 chars)' });
  }

  const existing = await Url.findOne({ shortCode });
  if (existing) {
    return res.status(400).json({ error: 'Shortcode already exists' });
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + ((validity || 30) * 60000));
  const shortUrl = `http://localhost:3000/${shortCode}`;

  const newUrl = new Url({ originalUrl, shortCode, shortUrl, expiresAt });
  await newUrl.save();

  res.json({ shortUrl, expiresAt });
});

router.get('/resolve/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const urlDoc = await Url.findOne({ shortCode });
  if (!urlDoc || new Date() > urlDoc.expiresAt) {
    return res.status(404).json({ error: 'Link expired or not found' });
  }

  urlDoc.clickCount++;
  await urlDoc.save();

  const click = new Click({
    shortCode,
    referrer: req.get('Referrer') || 'direct',
    geoLocation: req.ip,
  });
  await click.save();

  res.json({ originalUrl: urlDoc.originalUrl });
});

router.get('/stats', async (req, res) => {
  const urls = await Url.find();
  const stats = [];

  for (const url of urls) {
    const clicks = await Click.find({ shortCode: url.shortCode });
    stats.push({
      shortUrl: url.shortUrl,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      clickCount: url.clickCount,
      clicks,
    });
  }

  res.json(stats);
});

module.exports = router;
