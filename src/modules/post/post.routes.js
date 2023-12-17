const { Router } = require("express");
const { Authorization } = require("../../common/middlewares/auth.guard");
const { upload } = require("../../common/utils/multer");
const postController = require("./post.controller");
const {
  postAuthorization,
} = require("../../common/middlewares/post_authorization.guard");
const router = Router();

router.get("/all", Authorization, postController.all);
router.get("/:id", Authorization, postController.one);

router.post(
  "/create",
  Authorization,
  upload.fields([
    {
      name: "content",
      maxCount: 4,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  postController.create
);

router.put(
  "/update/:id",
  Authorization,
  postAuthorization,
  upload.fields([
    {
      name: "content",
      maxCount: 4,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  postController.update
);
router.post("/like/:id", Authorization, postController.like);
router.delete("/dislike/:id", Authorization, postController.disLike);

router.delete(
  "/delete/:id",
  Authorization,
  postAuthorization,
  postController.delete
);

module.exports = {
  PostRouter: router,
};
