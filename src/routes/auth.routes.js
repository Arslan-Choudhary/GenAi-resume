import { Router } from "express";
import { AuthController } from "#controllers";
import { authUser } from "#middlewares";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
// authRouter.post("/register", AuthController.registerUser);
authRouter.route("/register").post(AuthController.registerUser);

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
// authRouter.post("/login", AuthController.loginUser);
authRouter.route("/login").post(AuthController.loginUser);

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.route("/logout").get(AuthController.logoutUser);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.route("/get-me").get(authUser, AuthController.getMeController);

export default authRouter;
