const bcrypt = require("bcrypt");
const autoBind = require("auto-bind");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = prisma;
  }

  async register(data) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const user = await this.#model.user.create({ data }).catch((err) => {
      throw createHttpError.BadRequest(
        "username already used choose another one"
      );
    });

    return user;
  }
  async login({ username, password }) {
    const user = await this.#model.user.findFirst({
      where: {
        username,
      },
      select: {
        password: true,
        username: true,
        id: true,
      },
    });
    if (!user) throw createHttpError.NotFound("username or password is wrong!");
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw createHttpError.InternalServerError("try again");
    const accessToken = this.signAccessToken({
      id: user.id,
      username: user.username,
    });
    
    return accessToken;
  }
  async changePassword(id) {}
  async resetPassword() {}

  signAccessToken(payload) {
    const option = { expiresIn: "10day" };
    const SECRET_KEY = process.env.SECRET_KEY;
    return jwt.sign(payload, SECRET_KEY, option);
  }
}

module.exports = new AuthService();
