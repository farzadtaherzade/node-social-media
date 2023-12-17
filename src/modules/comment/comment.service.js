const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const { deleteFile } = require("../../common/utils/functions");
const prisma = new PrismaClient();

class CommentService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = prisma;
  }
  async create() {}
  async delete() {}
  async findComment() {}
}

module.exports = new CommentService();
