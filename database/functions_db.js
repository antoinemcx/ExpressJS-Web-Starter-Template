async function getUserByEmail(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await global.db.query(`SELECT * FROM users WHERE email = ?`, [email]);
            resolve(rows[0]);
        } catch (error) {
            reject(error);
        }
    });
};

async function getUserByUsername(username) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await global.db.query(`SELECT * FROM users WHERE username = ?`, [username]);
            resolve(rows[0]);
        } catch (error) {
            reject(error);
        }
    });
};

async function getUserById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await global.db.query('SELECT * FROM users WHERE id = ?', [id]);
            resolve(rows[0]);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { getUserByEmail, getUserByUsername, getUserById }; 