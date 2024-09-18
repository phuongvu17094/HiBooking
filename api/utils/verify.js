import jwt from "jsonwebtoken";
import { createdError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createdError(401, "You are not authenticated!"));
  }

  //neu co token se tien hanh kiem tra voi secret key xem hop le hay khong
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createdError(403, "Token is not valid!"));

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createdError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createdError(403, "You are not authorized!"));
    }
  });
};
