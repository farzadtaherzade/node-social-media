const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");

const prisma = new PrismaClient();

const postAuthorization = async (req, res, next) => {
  try {
    const { id: ownerId } = req.user;
    const { id } = req.params;
    const post = await prisma.post
      .findFirst({
        where: {
          id: Number(id),
          ownerId: Number(ownerId),
        },
      })
      .catch((err) => {
        throw createHttpError.Unauthorized("you dont have access to this page");
      });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAuthorization,
};
