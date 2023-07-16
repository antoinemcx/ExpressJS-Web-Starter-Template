// You have to create both default.js (for development) and production.js (for production builds) files.
// Please fill in all fields.

module.exports = {
    port: 1234,
    
    website: {
        url: 'http://localhost:1234',
        jwt_token: '',
    },

    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: '' //MariaDB database name
    }
}