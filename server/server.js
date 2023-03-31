const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const { createPublicKey } = require("crypto");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for students in the endpoint '/api/students'
app.get("/api/students", async (req, res) => {
  try {
    const { rows: students } = await db.query("SELECT * FROM students");
    res.send(students);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = {
      name: req.body.name,
      city: req.body.city,
      fave: req.body.fave,
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
      "INSERT INTO students(name, city, fave) VALUES($1, $2, $3) RETURNING *",
      [newStudent.name, newStudent.city, newStudent.fave]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for students
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await db.query("DELETE FROM students WHERE id=$1", [studentId]);
    console.log("From the delete request-url", studentId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a student
app.put("/api/students/:studentId", async (req, res) => {
  //console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId;
  const updatedStudent = {
    id: req.body.id,
    name: req.body.name,
    city: req.body.city,
    fave: req.body.fave,
  };
  console.log("In the server from the url - the student id", studentId);
  console.log(
    "In the server, from the react - the student to be edited",
    updatedStudent
  );
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET name=$1, city=$2, fave=$3 WHERE id=${studentId} RETURNING *`;
  const values = [
    updatedStudent.name,
    updatedStudent.city,
    updatedStudent.fave,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// ***** Connect to the Open Weather API ******** //
//You can design ur backend however u want,
//Its just when im calling their API i need to follow their docs
//Route in front end and back end DO need to match, but the query part can be different!!!!!
//So add the query part to the front end
app.get("/weather", (req, res) => {
  const cityName = req.query.cityName; //req.query what frontend is sending to the back (getting thhe city the user entered!)//req is request. 3: body, query, route , Get the query section out of the request
  const apiKey = "0e9342e28737ba69d50dca7f36aec7e6";
  const params = new URLSearchParams({
    q: req.query.cityName,
    appid: apiKey,
    units: "imperial",
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((error) => {
      console.log(error);
    });
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
