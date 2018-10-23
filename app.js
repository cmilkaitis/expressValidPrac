const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exValid = require("express-validator");
const { check, validationResult } = require("express-validator/check");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(exValid());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let users = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@email.com"
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "janesmith@email.com"
  },
  {
    first_name: "Ryu",
    last_name: "Ninja",
    email: "ryuninjas@email.com"
  }
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Customer",
    users
  });
});

app.post("/users/add", [check("email").isEmail()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  };
  users.push(newUser);
  res.redirect("/");
});

app.listen(port, () => console.log(`running on ${port}`));
