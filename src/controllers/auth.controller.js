import { AuthService } from "#service";
import { ResponseHandler } from "#utils";

class AuthController {
  /**
   * @name registerUserController
   * @description register a new user, expects username, email and password in the request body
   * @access Public
   */

  static async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const { user, token } = await AuthService.registerUser(
        username,
        email,
        password,
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const responseData = {
        message: "User registered successfully",
        _id: user._id,
        email: user.email,
        username: user.username,
        token: token,
      };

      ResponseHandler.createHandler(res, responseData);
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }

  /**
   * @name loginUserController
   * @description login a user, expects email and password in the request body
   * @access Public
   */

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const { user, token } = await AuthService.loginUser(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const responseData = {
        message: "User loggedIn successfully.",
        _id: user._id,
        email: user.email,
        username: user.username,
        token: token,
      };

      ResponseHandler.createHandler(res, responseData);
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }

  static async logoutUser(req, res) {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];

      const blackListedToken = await AuthService.logoutUser(token);

      res.clearCookie("token");

      ResponseHandler.successHandler(
        res,
        blackListedToken,
        "User logged out successfully",
      );
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }

  static async getMeController(req, res) {
    try {
      const UserId = req.user._id;

      const user = await AuthService.getMeService(UserId);

      const responseData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      ResponseHandler.successHandler(
        res,
        responseData,
        "User details fetched successfully",
      );
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }
}

export default AuthController;
