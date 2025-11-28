const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('./config/auth');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'pursuit7-crowned',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/pursuit7' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

// Auth middleware
app.use(auth.ensureAuthenticated);

// Routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pursuit7')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`👑 Pursuit7 Gaming running on http://localhost:${PORT}`);
});
