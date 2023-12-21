const autoBind = require("auto-bind");
const commentService = require("./comment.service");
const { commentSchema } = require("../../common/validators/comment");

class CommentController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = commentService;
  }
  async create(req, res, next) {
    try {
      const { message } = await commentSchema.validateAsync(req.body);
      const { id } = req.params;
      const { id: userId } = req.user;

      const comment = await this.#service.create(
        message,
        Number(id),
        Number(userId)
      );
      return res.status(201).json({
        comment,
      });
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const { commentId, postId } = req.params;
      const { id: userId } = req.user;

      const comment = await this.#service.delete({
        commentId: Number(commentId),
        userId: Number(userId),
        postId: Number(postId),
      });
      return res.status(200).json({
        message: "message deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async all(req, res, next) {
    try {
      const { take, skip } = req.query;
      const { postId } = req.params;

      const comments = await this.#service.all({ take, skip, postId });
      return res.status(200).json({
        comments,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
