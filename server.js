//import statements
const express = require("express");
const dotenv = require("dotenv");
//config
dotenv.config();
const port = process.env.PORT || 5000;
const studentData = [{ id: 1, name: "divya", address: "rajastan", age: 22 }];
//app init
const app = express();

//app middlewares
app.use(express.json());
const checkUser = (req, res, next) => {
  const secretKey = req.headers.secretkey;
  console.log({ secretKey, envKey: process.env.SECRET_KEY });
  if (secretKey === process.env.SECRET_KEY) {
    next();
  } else {
    res.status(401).send("Hey you're unauthorised!..");
  }
};

//app services or routes
app.get("/getStudents", (req, res) => {
  res.json(studentData);
});
app.get("/student/:id", (req, res) => {
  const { id } = req.params;
  const student = studentData.find((s) => s.id === parseInt(id));
  if (student) {
    res.send(student);
    return;
  } else {
    res.status(404).send("Student Not found from id " + id);
    return;
  }
});
app.post("/createStudent", checkUser, (req, res) => {
  try {
    console.log(req.body);
    studentData.push({ id: studentData.length + 1, ...req.body });
    res.status(201).send("Student created successfully..");
  } catch (err) {
    console.log(err);
  }
});
app.put("/updateStudent/:id", checkUser, (req, res) => {
  const { id } = req.params;
  const studentIndex = studentData.findIndex((s) => s.id === parseInt(id));
  studentData[studentIndex] = { ...studentData[studentIndex], ...req.body };
  res.json(studentData[studentIndex]);
});
app.delete("/deleteStudent/:id", checkUser, (req, res) => {
  const { id } = req.params;
  const studentIndex = studentData.findIndex((s) => s.id === parseInt(id));
  studentData.splice(studentIndex, 1); // [1,4,5,8,9]
  res.send("student deleted successfully..");
});

//app listen or start
app.listen(port, () => console.log(`server running on ${port}`));
