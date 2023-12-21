const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");

const prisma = new PrismaClient();

const rbacAuthorizaton = (...roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (roles.includes(user.role)) next();
      throw createHttpError.Unauthorized(
        "you dont have permission to this page"
      );
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  rbacAuthorizaton,
};
