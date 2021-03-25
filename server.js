const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();
// const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_DSN, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("yes we are connected");
});

// routes
app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));

app.listen(3000, () => {
    console.log("App running on port 3000!");
  }); 