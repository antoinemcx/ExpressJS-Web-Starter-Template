const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { renderTemplate, generateUserID } = require('../utils/functions');
const { isNotAuthenticated, isAuthenticated } = require('../middlewares/auth');
const router = express.Router();
console.log("\t\x1b[1mLogin\x1b[0m (system) Route loaded");


router.get('/register', async (req, res) => {
    if(req.isAuthenticated() && req.user.isAdmin === null) { return renderTemplate(res, req, 'error.ejs', { code: '403' }) };

    renderTemplate(res, req, 'login/register.ejs', { message: null });
})
router.post('/register', async (req, res) => {
    const { username, email, password, password_confirm } = req.body;
    try {
        const search = await global.db.query('SELECT id,username,email FROM users WHERE email = ? or username = ?', [email, username]);

        if(search[0] !== undefined) { return res.render('login/register.ejs', { message: "Email or username already used." })
        } else if(username.length < 3 || username.length > 20) { return res.render('login/register.ejs', { message: "The username must be between 3 and 20 characters." })
        } else if(password.length < 8 || password.length > 30) { return res.render('login/register.ejs', { message: "The password must be between 8 and 30 characters." })
        } else if(password !== password_confirm) { return res.render('login/register.ejs', { message: "The passwords don't match." }) }

        const hashedPassword = await bcrypt.hash(password, 10);
        global.db.query('INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)', [generateUserID(15), username, email, hashedPassword], (err, results) => {
            if(err) { console.log(err); return renderTemplate(res, req, 'error.ejs', { code: '400' }) }
        })

        res.redirect('/login?registered=true')

    } catch(e) {
        console.log(e)
        renderTemplate(res, req, 'error.ejs', { code: '400' })
    }
})

router.get('/login', isNotAuthenticated, async (req, res) => {
    const registered = req.params.registered;

    renderTemplate(res, req, 'login/login.ejs', {
        message: req.flash('error'), registered: registered ? true : false
    });
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true, })(req, res, next)
})

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('connect.sid');
    
    res.redirect('/login');
})

module.exports = router;