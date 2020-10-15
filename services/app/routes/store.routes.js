const { authJwt , verifyStore } = require("../middleware");
const controller = require("../controllers/store.controller");

module.exports = function(app) {
  app.post(
    "/api/stores",
    [authJwt.verifyToken],
    controller.getStoreList
  );
  app.get(
    "/api/getStore",
    [authJwt.verifyToken],
    controller.getStoreById
  );
  app.post(
    "/api/insertOrUpdateStore",
    [
      authJwt.verifyToken ,
      verifyStore.checkDuplicateStoreName,
      verifyStore.checkEmptyValidation
    ],
    controller.insertOrUpdate
  );
};
