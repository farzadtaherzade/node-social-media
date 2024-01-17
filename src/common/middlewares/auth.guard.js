const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token) throw new createHttpError.Unauthorized("login to your account");

    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data.id) {
      const user = await prisma.user
        .findUnique({
          where: {
            id: data.id,
          },
          include: {
            followers: true,
            following: true,
          },
        })
        .catch((err) => {
          throw new createHttpError.Unauthorized("account not found!");
        });
      delete user.password;
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized("invalid token");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Authorization,
};
