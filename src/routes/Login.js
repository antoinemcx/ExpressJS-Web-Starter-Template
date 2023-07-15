const express = require('express');
const passport = require('passport');
const { renderTemplate } = require('../utils/functions');
const { isNotAuthenticated, isAuthenticated } = require('../middleware/auth');
const router = express.Router();
console.log("\t\x1b[1mLogin\x1b[0m (system) Route loaded");


router.get('/login', isNotAuthenticated, async (req, res) => {
    res.send('Yes');
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, }), (req, res) => {
    res.redirect(req.header('Referer') || '/');
})

router.get('/logout', isAuthenticated, (req, res) => {
    req.secret = global.config.website.cookieKey;
    res.clearCookie('session');
    res.clearCookie('session.sig');

    res.redirect('/login');
})

module.exports = router;