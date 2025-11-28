const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Player = require('../models/Player');
const Staff = require('../models/Staff');

// Home
router.get('/', async (req, res) => {
  const players = await Player.find().lean();
  const staff = await Staff.find().lean();
  res.render('index', { players, staff });
});

// About
router.get('/about', (req, res) => {
  res.render('about');
});

// Rosters
router.get('/rosters', async (req, res) => {
  const players = await Player.find().lean();
  const staff = await Staff.find().lean();
  res.render('rosters', { players, staff });
});

// Merch
router.get('/merch', (req, res) => {
  // In real app: fetch from Merch model
  res.render('merch');
});

// Socials
router.get('/socials', (req, res) => {
  res.render('socials');
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact');
});

// Login
router.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.render('login', { error: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  req.session.isAdmin = user.isAdmin;
  res.redirect('/admin');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
