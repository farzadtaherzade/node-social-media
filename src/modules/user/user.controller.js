const autoBind = require("auto-bind");
const { UserService } = require("./user.service");
const { deleteFile } = require("../../common/utils/functions");
const { userSchema } = require("../../common/validators/user");
const createHttpError = require("http-errors");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = UserService;
  }
  async getUser(req, res, next) {
    try {
      const user = req.user;
      const { username } = req.params;
      const result = await this.#service.getUser({ username, user });
      return res.status(200).json({
        user: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProfileImage(req, res, next) {
    try {
      const profile = req?.file;
      const user = req.user;
      if (user.profile_image) {
        deleteFile(user.profile_image);
      }

      await this.#service.updateProfileImage(profile, user.id);
      return res.status(200).json({
        message: "profile image updated",
      });
    } catch (error) {
      next(error);
      deleteFile(req.file.filename);
    }
  }
  async updateInfo(req, res, next) {
    try {
      const { username, bio, gender } = await userSchema.validateAsync(
        req.body
      );

      const user = await this.#service.updateInfo(
        { username, bio, gender },
        req.user.id
      );

      return res.status(200).json({
        message: "profile updated",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyAccount(req, res, next) {
    try {
      const { email } = await userSchema.validateAsync(req.body);
      const user = req.user;

      await this.#service.verifyAccount(user, email);

      res.status(200).json({
        message: "check your email!",
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyToken(req, res, next) {
    try {
      const { token } = req.params;
      const user = req.user;
      await this.#service.verifyToken(token, user);
      return res.status(200).json({
        message: "your account verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async followUser(req, res, next) {
    try {
      const { follower } = req.params;
      const userId = req.user.id;
      await this.#service.followUser(userId, follower);
      return res.status(200).json({
        message: "follow user successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async unFollowUser(req, res, next) {
    try {
      const { follower } = req.params;
      const userId = req.user.id;
      await this.#service.unFollowUser(userId, follower);
      return res.status(200).json({
        message: "unfollow user successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async upgradeAccount(req, res, next) {}
}

module.exports = {
  UserController: new UserController(),
};
