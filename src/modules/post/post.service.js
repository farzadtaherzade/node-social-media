const autoBind = require("auto-bind");
const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");
const { deleteFile } = require("../../common/utils/functions");
const prisma = new PrismaClient();

class postService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = prisma;
  }
  async create(data, files) {
    data.tags = data?.tags?.split(" ") || "";
    const content = files.content?.map((file) => {
      return file.filename;
    });
    const thumbnail = files?.thumbnail ? files?.thumbnail[0]?.filename : "";
    const post = await this.#model.post
      .create({
        data: { ...data, content, thumbnail },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError(err);
      });
    return post;
  }
  async update(data, id, files) {
    const oldPost = await this.findPost(id);
    data.tags = data?.tags?.split(" ") || oldPost.tags;
    const content = files.content
      ? files.content?.map((file) => {
          return file.filename;
        })
      : oldPost.content;
    const thumbnail = files?.thumbnail
      ? files?.thumbnail[0]?.filename
      : oldPost.thumbnail;

    const post = await this.#model.post
      .update({
        data: { ...data, content, thumbnail },
        where: {
          id,
        },
        include: {
          owner: true,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError(err);
      });
    if (files.content) {
      oldPost.content.map((file) => {
        deleteFile(file);
      });
    }
    if (files.thumbnail) {
      deleteFile(oldPost.thumbnail);
    }
    return post;
  }
  async delete(id) {
    const post = await this.findPost(id);
    const deleteResult = await this.#model.post
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        throw createHttpError.InternalServerError("post not deleted");
      });
    post.content.map((filename) => {
      deleteFile(filename);
    });
    deleteFile(post.thumbnail);
    return deleteResult;
  }
  async one(id, user) {
    const post = await this.findPost(id);
    if (post.ownerId === user.id || post.published === true) {
      const isWatched = !!post.ViewPost.find(
        (item) => item.userId === user.id && item.postId === post.id
      );
      if (!isWatched) {
        console.log("daspjdihas");
        const viewPost = await this.#model.viewPost
          .create({
            data: {
              postId: post.id,
              userId: user.id,
            },
          })
          .catch((err) => {
            console.log(err);
          });
        const newPost = await this.findPost(post.id);
        return newPost;
      }
      return post;
    }
    throw createHttpError.NotFound("post not found!");
  }
  async all() {
    const posts = await this.#model.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createAt: {
          sort: "asc",
        },
      },
    });
    return posts;
  }
  async like(id, userId) {
    const post = await this.findPost(id);
    const alreadyLiked = !!post.likes.find(
      (item) => item.userId === userId && item.postId === post.id
    );
    if (alreadyLiked)
      throw createHttpError.BadGateway("your already like this post");

    const like = await this.#model.likes
      .create({
        data: {
          postId: post.id,
          userId,
        },
      })
      .catch((err) => {
        console.log("post didnt like try again");
      });
    return like;
  }
  async dislike(id, userId) {
    const post = await this.findPost(id);
    const like = post.likes.find(
      (item) => item.userId === userId && item.postId === post.id
    );
    console.log(like);
    if (!!!like) throw createHttpError.BadGateway("your not like this post");
    console.log("daspdjsaiu");
    const dislike = await this.#model.likes
      .delete({
        where: {
          postId: post.id,
          userId,
          id: like.id,  
        },
      })
      .catch((err) => {
        console.log("post didnt dislike try again");
      });
    return dislike;
  }
  async findPost(id) {
    const post = await this.#model.post
      .findUnique({
        where: {
          id,
        },
        include: {
          likes: {
            include: {
              user: true,
            },
          },
          owner: true,
          Comment: true,
          ViewPost: {
            include: {
              user: true,
            },
          },
        },
      })
      .catch((err) => {
        throw createHttpError.NotFound("post not found!");
      });
    if (!post) throw createHttpError.NotFound("post not found!");
    return post;
  }
}

module.exports = new postService();
