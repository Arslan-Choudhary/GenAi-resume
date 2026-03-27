import { AuthRepository } from "#repository";

class AuthService {
  static async registerUser(username, email, password) {
    if (!username || !email || !password) {
      const error = new Error("Please provide username, email and password");
      error.status = 400;
      throw error;
    }

    const isUserAlreadyExists = await AuthRepository.FindUserByEmailOrPassword(
      username,
      email,
    );

    if (isUserAlreadyExists) {
      const error = new Error(
        "Account already exists with this email address or username",
      );
      error.status = 400;
      throw error;
    }

    const user = await AuthRepository.CreateUser({ username, email, password });

    const token = user.generateToken();

    return { user, token };
  }

  static async loginUser(email, password) {
    const user = await AuthRepository.FindUserByEmail(email);

    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    const token = user.generateToken();

    return { user, token };
  }

  static async logoutUser(token) {
    if (!token) {
      const error = new Error("User already logged out");
      error.status = 400;
      throw error;
    }

    const blackListedToken = await AuthRepository.logoutUser(token);

    return blackListedToken;
  }

  static async getMeService(userId) {
    const user = await AuthRepository.FindById(userId);

    return user;
  }
}

export default AuthService;
