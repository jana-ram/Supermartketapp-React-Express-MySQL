const db = require("../models");
const Store = db.store;
const Op = db.Sequelize.Op;
checkDuplicateStoreName = (req, res, next) => {
  const {
    storeName,
    storeId
  } = req.body;
  // Check store name allready exists
  if(storeId == 0){
    Store.findOne({
      where: {
        storeName: storeName,
      }
    }).then(category => {  
        if (category) {
          res.status(400).send({
            success : 0,
            message: "Failed! Store Name is already in use!",
          });
          return;
        };
        next();
    });
  } else {
    Store.findAll({
      where: {
        storeName: storeName,
        id : {
          [Op.and] : {
            [Op.ne] : storeId
          }
        }
      }
    }).then(category => {
      if (category.length > 0) {
        res.status(400).send({
          success : 0,
          message: "Failed! Store Name is already in use!",
        });
        return;
      };
      next();
    });
  }
};
checkEmptyValidation = (req, res, next) => {
  const {
    storeName,
    phone,
    address,
    email
  } = req.body;
  if(storeName === ""){
    res.status(400).send({
      success : 0,
      message: "Failed! Storename is mandatory!"
    });
    return;
  }  
  if(phone === ""){
    res.status(400).send({
      success : 0,
      message: "Failed! PhoneNo is mandatory!"
    });
    return;
  }
  if(address === ""){
    res.status(400).send({
      success : 0,
      message: "Failed! Address is mandatory!"
    });
    return;
  }
  if(email === ""){
    res.status(400).send({
      success : 0,
      message: "Failed! Email is mandatory!"
    });
    return;
  }
  next();
};
const verifyCategory = {
    checkDuplicateStoreName: checkDuplicateStoreName,
    checkEmptyValidation : checkEmptyValidation
};

module.exports = verifyCategory;
