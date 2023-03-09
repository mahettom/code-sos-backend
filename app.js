// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const { isAuthenticated } = require('./middleware/isAuthenticated')

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const authRouter = require("./routes/auth.routes");       //  <== IMPORT
app.use("/auth", authRouter);                             //  <== ADD

app.use("/", isAuthenticated);

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const availableTutors = require("./routes/availableTutors.routes");
app.use("/available-tutors", availableTutors);

const posts = require("./routes/posts.routes");
app.use("/posts", posts);

const profile = require("./routes/profile.routes");
app.use("/profile", profile);






// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
