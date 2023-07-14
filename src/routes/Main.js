const express = require('express');
const { renderTemplate } = require('../utils/functions');
const router = express.Router();
console.log("\tRouter \x1b[1mMain\x1b[0m chargé")

router.get("/", async (req, res) => { renderTemplate(res, req, 'index.ejs') })

module.exports = router;