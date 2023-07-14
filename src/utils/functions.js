function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    
    do { currentDate = Date.now(); } while (currentDate - date < milliseconds);
};

const renderTemplate = async (res, req, template, data = {}) => {
    const baseData = { req, user: req.isAuthenticated() ? req.user : null };
    
    res.render(`${template}`, Object.assign(baseData, data));
};

module.exports = { sleep, renderTemplate };