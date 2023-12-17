const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");
const { sendEmail } = require("../../common/utils/send.email");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

class UserService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = prisma;
  }
  async updateProfileImage(profile, userId) {
    if (!profile) throw createHttpError.BadRequest("upload a file");
    const user = await this.#model.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_image: profile.filename,
      },
    });
    if (!user)
      throw new createHttpError.InternalServerError(
        "internal server try again"
      );
    return user;
  }
  async updateInfo(data, id) {
    const user = await this.#model.user
      .update({
        where: {
          id,
        },
        data,
      })
      .catch((err) => {
        if (err)
          throw new createHttpError.InternalServerError(
            "internal server try again"
          );
      });
    return user;
  }
  async verifyAccount(user, email) {
    if (user.verifiedEmail)
      throw createHttpError.InternalServerError(
        "your account already verified!"
      );
    const result = await this.#model.user
      .update({
        where: {
          id: user.id,
        },
        data: {
          email,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError(err);
      });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY_EMAIL, {
      expiresIn: "1d",
    });
    const url = `${process.env.URL}/user/verify/${token}`;
    const emailSend = await sendEmail(
      `please click this to confirm your email: <a href="${url}">${process.env.URL}</a>`,
      email
    );
    return emailSend;
  }
  async verifyToken(token, user) {
    if (!user.email)
      throw createHttpError.BadRequest("please update your email!");
    if (user.verifiedEmail)
      throw createHttpError.BadRequest("Your Account already verified");
    const { id } = jwt.verify(token, process.env.SECRET_KEY_EMAIL);
    const result = await this.#model.user
      .update({
        where: {
          id,
        },
        data: {
          verifiedEmail: true,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError(err);
      });
    return result;
  }
  async followUser(userId, followerId) {
    const follower = await this.findUser(followerId);
    const user = await this.findUser(userId);
    if (user.id == follower.id)
      throw createHttpError.NotAcceptable("You cant follow yourself");
    if (!user.verifiedEmail)
      throw createHttpError.Unauthorized(
        "please verfiy your account before follow"
      );
    const followed = await this.isFollowd(user.id, follower.id);

    if (followed) throw createHttpError.NotAcceptable("user already followd");
    const followResult = await this.#model.follow
      .create({
        data: {
          followerId: user.id,
          followingId: follower.id,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError("follow action got error");
      });
    return followResult;
  }
  async unFollowUser(userId, followerId) {
    const follower = await this.findUser(followerId);
    const user = await this.findUser(userId);
    if (user.id == follower.id)
      throw createHttpError.NotAcceptable("You cant unfollow yourself");

    if (!user.verifiedEmail)
      throw createHttpError.Unauthorized(
        "please verfiy your account before unfollow"
      );
    const followed = await this.isFollowd();

    if (!followed) throw createHttpError.NotAcceptable("user not followd");
    const followResult = await this.#model.follow
      .delete({
        where: {
          id: followed.id,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError("follow action got error");
      });
    return followResult;
  }
  async upgradeAccount() {}

  async findUser(id) {
    id = Number(id);
    const user = await this.#model.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) throw createHttpError.NotFound("user not found");
    return user;
  }
  async isFollowd(userId, followerId) {
    return await this.#model.follow
      .findFirst({
        where: {
          followerId: userId,
          followingId: followerId,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError(`err`);
      });
  }
}

module.exports = {
  UserService: new UserService(),
};
