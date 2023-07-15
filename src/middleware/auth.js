const { renderTemplate } = require('../utils/functions');

const isAuthenticated = async (req, res, next) => {
    if(req.isAuthenticated()) { return next() };

    renderTemplate(res, req, 'error.ejs', { code: '401' });
};

const isNotAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) { return next() };

    res.redirect('/');    
}

module.exports = { isAuthenticated, isNotAuthenticated };