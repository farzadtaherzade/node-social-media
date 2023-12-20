const autoBind = require("auto-bind");
const adminService = require("./admin.service");

class AdminController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = adminService;
  }
}

module.exports = new AdminController();
