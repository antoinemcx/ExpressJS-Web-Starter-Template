const express = require('express');
const { renderTemplate } = require('../utils/functions');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();
console.log("\t\x1b[1mMain\x1b[0m Route loaded");


router.get("/", async (req, res) => {
    renderTemplate(res, req, 'index.ejs')
})
router.get('/test', isAuthenticated, async (req, res) => { res.json(req.user) })

module.exports = router;