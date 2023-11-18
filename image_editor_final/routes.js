// routes.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const upload = require('multer')({ dest: 'public/uploads' });
const sharp = require('sharp');
const User = require('./models/user');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes and logic

// Home page
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Signup
router.get('/signup', (req, res) => {
  res.render('signup');
});


router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))
// Signup form submission
router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  newUser.save()
    .then(() => {
      res.redirect('/login');
    })
    .catch(err => {
      console.error(err);
      res.redirect('/signup');
    });
});

// Image upload page
router.get('/upload', (req, res) => {
  res.render('upload');
});

// Image upload form submission
router.post('/upload', upload.single('image'), (req, res) => {
  const { file } = req;
  const { width, height } = req.body;

  sharp(file.path)
    .resize(parseInt(width), parseInt(height))
    .toFormat('webp')
    .toFile(`public/uploads/${file.filename}.webp`, (err, info) => {
      if (err) {
        console.error(err);
        res.redirect('/upload');
      } else {
        res.redirect('/gallery');
      }
    });
});

// Image gallery
router.get('/gallery', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.redirect('/');
    } else {
      res.render('gallery', { users });
    }
  });
});

module.exports = router;
