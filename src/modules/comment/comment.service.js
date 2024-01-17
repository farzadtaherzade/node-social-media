const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const { deleteFile } = require("../../common/utils/functions");
const createHttpError = require("http-errors");
const prisma = new PrismaClient();

class CommentService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = prisma;
  }

  async create(message, postId, userId) {
    const comment = await this.#model.comment
      .create({
        data: {
          authorId: userId,
          postId,
          message,
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              profile_image: true,
            },
          },
          Post: {
            include: {
              Comment: true,
            },
          },
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError(err);
        throw createHttpError.InternalServerError(
          "your commen not submit try again"
        );
      });
    return comment;
  }

  async delete({ commentId, userId, postId }) {
    const result = await this.#model.comment
      .delete({
        where: {
          id: commentId,
          authorId: userId,
        },
      })
      .catch((err) => {
        throw createHttpError.BadGateway("comment is not blong to you");
      });
    if (!result) throw createHttpError.NotFound("comment not found");
  }

  async all({ take = 30, skip = 0, postId }) {
    skip = Number(skip);
    take = Number(take);
    postId = Number(postId);
    console.log(postId);
    if (!postId) throw createHttpError.BadRequest("postId is empty");
    const comment = await this.#model.comment.findMany({
      where: {
        postId,
      },
      take,
      skip,
      include: {
        author: true,
      },
    });
    console.log(comment);
    return comment;
  }
}

module.exports = new CommentService();
