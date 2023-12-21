const { Router } = require("express");
const { Authorization } = require("../../common/middlewares/auth.guard");
const commentController = require("./comment.controller");
const router = Router();

router.post("/add/:id", Authorization, commentController.create);
router.get("/all/:postId", Authorization, commentController.all);
router.delete(
  "/delete/:postId/:commentId",
  Authorization,
  commentController.delete
);

module.exports = {
  CommentRouter: router,
};
