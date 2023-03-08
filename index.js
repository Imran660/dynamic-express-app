//import statements
const express = require("express");
const path = require("path");

//config statements

//server or app init
const server = express();

//server middlewares
// server.use('/user/details',(req,res,next)=>{
//     const {key}=req.query;
//     if(key==12789) next()
//     else res.status(401).send("Invalid user")
// })
// server.use("/user/cart", (req, res, next) => {
//   const { key } = req.query;
//   if (key == 12789) next();
//   else res.status(401).send("Invalid user");
// });
const checkUser = (req, res, next) => {
  const { key } = req.query;
  if (key == 12789) next();
  else res.status(401).send("Invalid user");
};
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

//server routes or api or services
server.get("/", (req, res) => {
  // res.send("hey users, welcome to my express app!..")
  res.render("index");
});

server.get("/user/details", checkUser, (req, res) => {
  res.send("Private details");
});

server.get("/user/cart", checkUser, (req, res) => {
  res.send("Card details");
});

server.get("/user", (req, res) => {
  res.send("hey user, Imran shaikh !..");
});

server.get("/user/:name", (req, res) => {
  const { name } = req.params;
  res.render("user", { user: name });
});

//server listen or start
server.listen(8000, () => console.log("server running on port 8000"));
