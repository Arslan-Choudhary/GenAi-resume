import { tokenBlacklistModel } from "#models";

class TokenRepository {
  static async FindToken(token) {
    return await tokenBlacklistModel.findOne({ token });
  }
}

export default TokenRepository;
