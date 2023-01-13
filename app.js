require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/user3DB",{ useNewUrlParser: true , useUnifiedTopology: true });


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const UserSchema = mongoose.Schema({
  email:String,
  password:String
});




const user = mongoose.model("user", UserSchema);

app.get("/", function(req,res){
    res.render("home");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.post("/register", function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const user1 = new user({
      email:req.body.username,
      password:hash
    });
  user1.save(function(err){
    if(!err){
      res.render("secrets");
    }
    else{
      res.send(err);
    }
  })
});
});

app.post("/login", function(req,res){
  const Username=req.body.username;
  const Password=req.body.password;
  user.findOne({email: Username},function(err, foundItems){
    if(err){
      res.send("err");
    }
    else{
      if(foundItems){
        bcrypt.compare(Password, foundItems.password, function(err, result) {
          res.render("secrets");
      });
      }}
  })
});


        






app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
