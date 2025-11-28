const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Player = require('../models/Player');
const Staff = require('../models/Staff');

// Middleware: Admin only
function requireAdmin(req, res, next) {
  if (!req.session.isAdmin) return res.redirect('/login');
  next();
}

router.get('/', requireAdmin, async (req, res) => {
  const players = await Player.find().lean();
  const staff = await Staff.find().lean();
  res.render('admin', { players, staff });
});

// CRUD: Player
router.post('/players', requireAdmin, async (req, res) => {
  await Player.create(req.body);
  res.redirect('/admin');
});

router.post('/players/:id', requireAdmin, async (req, res) => {
  await Player.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin');
});

router.get('/players/delete/:id', requireAdmin, async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

// CRUD: Staff
router.post('/staff', requireAdmin, async (req, res) => {
  await Staff.create(req.body);
  res.redirect('/admin');
});

router.post('/staff/:id', requireAdmin, async (req, res) => {
  await Staff.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin');
});

router.get('/staff/delete/:id', requireAdmin, async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
