const { Router } = require("express");
const { UserController } = require("./user.controller");
const { Authorization } = require("../../common/middlewares/auth.guard");
const { upload } = require("../../common/utils/multer");
const { rbacAuthorizaton } = require("../../common/middlewares/rbac.guard");
const router = Router();

router.get(
  "/:username",
  Authorization,
  rbacAuthorizaton("USER", "ADMIN", "UNVERIFIED_USER"),
  UserController.getUser
);
router.patch(
  "/upload-profile",
  Authorization,
  upload.single("profile"),
  UserController.updateProfileImage
);
router.put("/update-info", Authorization, UserController.updateInfo);
router.post("/verify-email", Authorization, UserController.sendVerfiyToken);
router.all("/verify/:token", Authorization, UserController.verifyToken);
router.post("/follow/:follower", Authorization, UserController.followUser);
router.post("/unfollow/:follower", Authorization, UserController.unFollowUser);

module.exports = {
  UserRouter: router,
};
