const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const Authorization = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization.split(" ");
    if (!token) {
      throw new createHttpError.Unauthorized("login to your account");
    }
    const data = jwt.verify(token[1], process.env.SECRET_KEY);
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
