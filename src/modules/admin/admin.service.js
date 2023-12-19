const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class AdminService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = prisma;
  }
}

module.exports = new AdminService();
