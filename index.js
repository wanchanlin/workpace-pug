const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const sessions = require("express-session");

const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

//set up the Express app
const app = express();
const port = process.env.PORT || "8887";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//set up app to use sessions
//You can use cookie: { maxAge: <time_in_ms> } to save the session to a cookie
app.use(
  sessions({
    secret: process.env.SESSIONSECRET,
    name: "MyUniqueSessID",
    saveUninitialized: false,
    resave: false,
    cookie: {} 
  })
);

//USE PAGE ROUTES FROM ROUTER(S)
app.use("/", require("./components/Position/routes"));

app.use("/user", require("./components/User/routes"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
}); 

