const autoBind = require("auto-bind");
const { postSchema } = require("../../common/validators/post");
const postService = require("./post.service");
const { deleteFile } = require("../../common/utils/functions");

class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async create(req, res, next) {
    try {
      const data = await postSchema.validateAsync(req.body);
      const files = await req.files;
      const ownerId = req.user.id;
      const post = await this.#service.create({ ...data, ownerId }, files);

      return res.status(201).json({
        post,
      });
    } catch (error) {
      if (req.files.content) {
        req?.files.content?.map((file) => {
          deleteFile(file.filename);
        });
      }
      if (req.files.thumbnail) {
        deleteFile(req?.files.thumbnail[0]?.filename);
      }
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const data = await postSchema.validateAsync(req.body);
      const files = await req.files;
      const { id } = req.params;
      const post = await this.#service.update(data, Number(id), files);
      return res.status(201).json({
        post,
      });
    } catch (error) {
      if (req.files.content) {
        req?.files.content?.map((file) => {
          deleteFile(file.filename);
        });
      }
      if (req.files.thumbnail) {
        deleteFile(req?.files.thumbnail[0]?.filename);
      }
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.delete(Number(id));
      res.status(200).json({
        message: "post deleted",
        post,
      });
    } catch (error) {
      next(error);
    }
  }
  async one(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;
      const post = await this.#service.one(Number(id), user);
      return res.status(200).json({
        post,
      });
    } catch (error) {
      next(error);
    }
  }
  async all(req, res, next) {
    try {
      const posts = await this.#service.all();
      return res.status(200).json({
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  async changeStatus(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async like(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const result = await this.#service.like(Number(id), userId);
      return res.status(201).json({
        message: "you like the post",
      });
    } catch (error) {
      next(error);
    }
  }
  async disLike(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const result = await this.#service.dislike(Number(id), userId);
      return res.status(201).json({
        message: "you dislike the post",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
