import { userModel, tokenBlacklistModel } from "#models";

class AuthRepository {
  static async FindUserByEmailOrPassword(username, email) {
    return await userModel.findOne({
      $or: [{ username, email }, {}],
    });
  }

  static async CreateUser(data) {
    return await userModel.create(data);
  }

  static async FindUserByEmail(email) {
    return await userModel.findOne({ email });
  }

  static async logoutUser(token) {
    return await tokenBlacklistModel.create({ token });
  }

  static async FindById(id) {
    return await userModel.findById(id);
  }
}

export default AuthRepository;
