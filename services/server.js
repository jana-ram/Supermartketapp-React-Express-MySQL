process.env.NODE = "development";
process.env.PORT = 3001;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var bcrypt = require("bcryptjs");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
const User = db.user;
db.sequelize.sync();

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// Welcome Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to store application." });
});

// Service Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/store.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Create dummy user
function initial() {
  User.create({
    username: "janakiraman",
    password : bcrypt.hashSync("11223344", 8),
    isActive : 1
  });
}