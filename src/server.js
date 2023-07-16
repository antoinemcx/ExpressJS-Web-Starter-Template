const environment = process.argv[2] || 'default';
global.config = require(`../config/${environment}`);
const { sleep, renderTemplate } = require('./utils/functions');
const { connectToDB } = require('../database/db');

const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const passport = require('passport');
const session = require("express-session");
const flash = require("connect-flash");
const initializePassport = require("./middlewares/passport");

console.clear();
console.log('\n*\n')
console.log(`\x1b[33mStarting the server (${environment})...\x1b[0m\n`);

const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(cookieParser());
app.use(flash());
initializePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'supersecreT',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static("src/public", { extensions:['pdf', 'jpg', 'jpeg', 'png', 'webp', 'mp4', 'gif'] }));


// ROUTERS LOADING
console.log("\x1b[33m%s\x1b[0m", "(!) General routers loading...");

const mainRoute = require('./routes/Main');
const loginRoute = require('./routes/Login');
const initialize = require('./middlewares/passport');

app.use('/', mainRoute);
app.use('/', loginRoute);

app.get("*", (req, res) => { renderTemplate(res, req, 'error.ejs', { code: '404' }) });
sleep(300);

connectToDB().then(() => {
    // SERVER LAUNCHING
    const listener = server.listen(global.config.port, '127.0.0.1', function () {
        console.log("\x1b[32m%s\x1b[0m", `(!) App listening on port ${listener.address().port} (\x1b[4m${global.config.website.url}\x1b[0m)\n`);
        sleep(300);
    });
});