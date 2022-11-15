// import statements
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
//config
dotenv.config();
//server init
const server = express();

//server middlewares
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");
// server.use("/user-data", (req, res, next) => {
//   //we can take input or data from the user in three ways
//   // 1. params 2. query and 3. body
//   console.log(process.env.PASSWORD);
//   const {username,password}=req.query;
//   if(username=="imran" && password==process.env.PASSWORD){
//     next()
//   }else{
//     res.status(401).send("Unauthorised user, please check your inputs")
//   }
// });

const checkUser = (req, res, next) => {
  //we can take input or data from the user in three ways
  // 1. params 2. query and 3. body
  console.log(process.env.PASSWORD);
  const { username, password } = req.query;
  if (username == "imran" && password == process.env.PASSWORD) {
    next();
  } else {
    res.status(401).send("Unauthorised user, please check your inputs");
  }
};

//server routes or services
//Four http methods
// GET- To read the data
// POST- To create the data
// PUT/PATCH To update the data
// DELETE To delete the data

//status code
// success
// 200 - OK - default
// 201 - Ok, created
// 304 - Ok, Not modified - default
// Error
// 400 - Bad Request
// 401 - Unauthorised  - default
// 403 - forbidden
// 404 - Not found - default
// 500 - Internal server error

server.get("/", (req, res) => {
  res.render("index", { name: req.query.name });
});

server.get("/signin",(req,res)=>{
    res.render("signin")
})

server.get("/user/:id", (req, res) => {
  console.log(req.params);
  res.send("hey user and your id is " + req.params.id);
});

server.get("/user-data", checkUser, (req, res) => {
  res.send("User key is " + 14652);
});

//server start
server.listen(8000, () => console.log("server started..."));
