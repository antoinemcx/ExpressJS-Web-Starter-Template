const mariadb = require('mariadb');
const { db } = global.config;

const dbPool = mariadb.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    connectionLimit: 5
});

const connectToDB = () => {
    return new Promise((resolve, reject) => {
        dbPool.getConnection().then(connection => {
            console.log("\x1b[32m%s\x1b[0m", `\n(!) MariaDB is connected`);
            connection.release();

            global.db = dbPool;
            resolve();
        }).catch(err => {
            console.error("\x1b[31m%s\x1b[0m", `\n[!] Error connecting to database : ${err.message}`);
            reject(err);
        });
    });
};

module.exports = { dbPool, connectToDB };