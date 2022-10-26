const mongoose = require("mongoose");
const User = require("../models/user")

exports.loginPage = (req, res) => {
    res.render("logIn");
}

exports.login = (req, res) => {
    var userAccount = User.findOne({
        email: req.body.email,
    })
    .where("password").equals(req.body.password)

    userAccount.exec((error, data) => {
        if(error) {
            console.log("Error: " + error)
        }
        else if(data != null){
            
            res.render("profile", {
                firstName: data.name.first,
                lastName: data.name.last
            })
        }
        else {
            res.send()
        }
    }) 
}


exports.signUp = (req, res) => {
    res.render("signUp");
}

exports.createUser = (req, res) => {
    const newUser = new User({
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        email: req.body.email,
        password: req.body.password
    })

    newUser.save()
    .then(() => 
        console.log("\n\tNew user saved...")
    )
    .then(() => {
        res.render("thankYou", {name: req.body.name});
    })
    .catch((error) => console.log("Error: " + error.message));
}


exports.profile = (req, res) => {
    res.render("profile")
}
