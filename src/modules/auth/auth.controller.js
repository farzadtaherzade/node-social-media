const authService = require("./auth.service");
const { authSchema } = require("../../common/validators/auth");
const autoBind = require("auto-bind");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async register(req, res, next) {
    try {
      const { username, password, gender } = await authSchema.validateAsync(
        req.body
      );
      await this.#service.register({ username, password, gender });

      return res.status(201).json({
        message: "account created",
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = await authSchema.validateAsync(req.body);
      const token = await this.#service.login({ username, password });
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          message: "you loggin to your account",
        });
    } catch (error) {
      next(error);
    }
  }
  async changePassword(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
