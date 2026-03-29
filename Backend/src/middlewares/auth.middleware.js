import jwt from "jsonwebtoken";
import { ResponseHandler } from "#utils";
import ENV from "#env";
import { TokenRepository } from "#repository";

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    ResponseHandler.authHandler(res, "Unauthorized access, token is missing");
  }

  const isTokenBlackListed = await TokenRepository.FindToken(token);

  if(isTokenBlackListed) {
    ResponseHandler.authHandler(res, "token is Invalid")
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    ResponseHandler.authHandler(res, "Invalid token");
  }
}

export default authUser;
