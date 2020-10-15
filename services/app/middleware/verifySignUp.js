const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  const {
    username
  } = req.body;
  // User Name exists
  User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        success : 0,
        message: "Failed! Username is already in use!"
      });
      return;
    }

    next();
  });
};
checkEmptyValidation = (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  if(username === ""){
    res.status(400).send({
      success : 0,
      message: "Failed! Username is mandatory!"
    });
    return;
  }  
  if(password === ""){
    res.status(400).send({
      success : 0,
      message: "Failed! Password is mandatory!"
    });
    return;
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername,
  checkEmptyValidation : checkEmptyValidation
};

module.exports = verifySignUp;
