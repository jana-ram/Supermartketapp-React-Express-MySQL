const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkEmptyValidation
    ],
    controller.signup
  );

  app.post("/api/auth/signin", [verifySignUp.checkEmptyValidation], controller.signin);
};
