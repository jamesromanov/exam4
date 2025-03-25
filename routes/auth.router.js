const express = require("express");
const authController = require("../controllers/auth.controller");
const protector = require("../middlewares/protector");

const authRouter = express.Router();

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/refresh").post(authController.resetAccessToken);
authRouter.route("/logout").post(protector, authController.logout);

module.exports = authRouter;
