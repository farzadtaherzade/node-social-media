const autoBind = require("auto-bind");
const commentService = require("./comment.service");

class CommentController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = commentService;
  }
}

module.exports = new CommentController();
