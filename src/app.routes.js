const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { PostRouter } = require("./modules/post/post.routes");
const { CommentRouter } = require("./modules/comment/comment.routes");
const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/post", PostRouter);
mainRouter.use("/post/comment", CommentRouter);

module.exports = mainRouter;
