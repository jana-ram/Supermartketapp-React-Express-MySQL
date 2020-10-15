const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.create({
    username: username,
    password: bcrypt.hashSync(password, 8),
    isActive : true
  }).then((user)=>{
      if(user)
          res.status(200).send({ 
              message: "User created successfully!",
              success : 1
          });
      else
          res.status(400).send({ 
              message: "Unable to create user!" ,
              success : 0
          });
  }).catch(err => {
      res.status(500).send({ 
        success : 0,        
        message: "sorry! something went wrong"
      });
  });
};

exports.signin = (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
    where: {
      username : username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(400).send({ 
          message: "Invalid user!" ,
          success : 0,
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Invalid Password!",
          success : 0,
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        data : {
            id: user.id,
            username: user.username,
            accessToken: token
        },
        message :"Login successfully!",
        success :1,
      });
    })
    .catch(err => {
      res.status(500).send({         
        message: "sorry! something went wrong",
        success : 0,
      });
    });
};
