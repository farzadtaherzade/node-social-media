const { Router } = require("express");
const { UserController } = require("./user.controller");
const { Authorization } = require("../../common/middlewares/auth.guard");
const { upload } = require("../../common/utils/multer");
const router = Router();

router.get("/me", Authorization, UserController.getMe);
router.patch(
  "/upload-profile",
  Authorization,
  upload.single("profile"),
  UserController.updateProfileImage
);
router.put("/update-info", Authorization, UserController.updateInfo);
router.post("/verify-email", Authorization, UserController.verifyAccount);
router.all("/verify/:token", Authorization, UserController.verifyToken);
router.post("/follow/:follower", Authorization, UserController.followUser);
router.post("/unfollow/:follower", Authorization, UserController.unFollowUser);

module.exports = {
  UserRouter: router,
};
