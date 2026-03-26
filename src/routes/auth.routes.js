const { Router } = require("express");
import { AuthController } from "#controllers";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", AuthController.registerUser);

export default authRouter;
