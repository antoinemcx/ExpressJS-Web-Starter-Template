const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByEmail, getUserByUsername, getUserById } = require('../../database/functions_db');

async function initialize(passport) {
    const authentificateUser = async (emailOrUsername, password, done) => {
        let user, usernameField;
        const userByEmail = await getUserByEmail(emailOrUsername);
        const userByUsername = await getUserByUsername(emailOrUsername);

        if(userByEmail !== undefined) {
            user = userByEmail;
            usernameField = "email";
        } else if(userByUsername !== undefined) {
            user = userByUsername;
            usernameField = "username";
        } else {
            return done(null, false, { message: "Incorrect username or email." })
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Incorrect password." })
            }
        } catch(e) {
            return (done(e))
        }
    }

    passport.use(new LocalStrategy({ usernameField }, authentificateUser))
    
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser(async (id, done) => { return done(null, (await getUserById(id))) })
}

module.exports = initialize;