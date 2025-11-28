const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Player = require('../models/Player');
const Staff = require('../models/Staff');

router.get('/', async (req, res) => {
  const players = await Player.find().lean();
  const staff = await Staff.find().lean();
  res.render('index', { players, staff });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/rosters', async (req, res) => {
  const players = await Player.find().lean();
  const staff = await Staff.find().lean();
  res.render('rosters', { players, staff });
});

router.get('/merch', (req, res) => {
  res.render('merch');
});

router.get('/socials', (req, res) => {
  res.render('socials');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/');
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.render('login', { error: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  req.session.isAdmin = user.isAdmin;
  res.redirect('/admin');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
