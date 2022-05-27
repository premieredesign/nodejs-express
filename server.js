const express = require("express");

const app = express();

app.use(express.json()); // Middleware

// Example ONLY
let senior;

// CRUD

// Read
app.get("/interest", (req, res) => {
  // localhost:3000/user-profile
  console.log("Header", req.headers);
  res.status(200).json({
    interest: senior.interest,
  });
}); // Read

// Create
app.post("/create-user", (req, res) => {
  senior = {
    name: req.body.name, // Gloria
    interest: req.body.interest, // Knitting
    age: req.body.age, // 65
    password: {
      type: req.body.password.type, //"image || number || color",
      value: req.body.password.value, // favorite picture, favorite number, favorite color -> Cat
    },
  };

  // Call the database
  //mongoDb.save(senior)

  res.status(201).json({
    body: {
      name: senior.name,
    },
  });
});

app.post("/login", (req, res) => {
  const user = {
    name: req.body.name,
    password: {
      type: req.body.password.type,
      value: req.body.password.value,
    },
  };

  // Check it against the database

  if (user.password.value === senior.password.value) {
    res.status(200).json({
      msg: `Hi ${user.name} welcome`,
    });
  } else {
    res.status(404).json({
      msg: `User not found`,
    });
  }
});

// app.put(); // Update
app.put("/update-user", (req, res) => {
  senior.interest = req.body.interest;

  // Database

  res.status(200).json({
    msg: "Thank you we have updated your interest",
    user: senior,
  });
});

// app.delete(); // Delete
app.delete("/delete-user", (req, res) => {
  if (req.body.name === senior.name) {
    senior = {};
  }

  // Database

  res.status(200).json({
    msg: "Sorry to see you go",
    user: senior,
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port: 3000");
});
