// Author: JonG
// the original code used regular node modules such as http and fs
// that code was around 110 lines long. Using express framework instead
// truncated it to 22 lines... a 5x reduction in the num lines.

const user = require("./models/user");

const 
    port = 3000,
    express = require("express");
    app = express(),
    mongoose = require("mongoose"),
    homeController = require("./controllers/homeController"),
    userController = require("./controllers/userController"),
    layouts = require("express-ejs-layouts");

const dbName = "asymmetry";

mongoose.connect(
    `mongodb://localhost:27017/${dbName}`,
    {useNewUrlParser: true}
)

const db = mongoose.connection;
db.once("open", () => {console.log(`\n\t...Connected to databse: "${dbName}"...\n`)})

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);

app.use(
    express.urlencoded({
        extended: false
    })
)
app.use(express.json())

app.get("/", homeController.homePage);
app.get("/memories", homeController.memories);
app.get("/book", homeController.book);
app.get("/signUp", userController.signUp);
app.post("/signUp", userController.createUser);
app.get("/login", userController.loginPage);
app.post("/login", userController.login);
app.get("/profile", userController.profile);

app.listen(port, () => {
    console.log(`\n\t...Server is running on port ${port}...`)
})