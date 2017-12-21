const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const User = require("./models/user");

const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true});
mongoose.Promise = global.Promise

app.use("/", indexRoutes);

const port = (process.env.PORT || 3000)


app.listen(port, function(req,res){
    console.log(`Server started on port ${port}`);
})