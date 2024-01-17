/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post Module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createPost:
 *              type: object
 *              required:
 *                  -   description
 *              properties:
 *                  description:
 *                      type: string
 *                  published:
 *                      type: boolean
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                  content:
 *                      type: array
 *                      items:
 *                          type: file
 *                  thumbnail:
 *                      type: file
 *          updatePost:
 *              type: object
 *              properties:
 *                  description:
 *                      type: string
 *                  published:
 *                      type: boolean
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *                  content:
 *                      type: array
 *                      items:
 *                          type: file
 *                  thumbnail:
 *                      type: file
 */

/**
 * @swagger
 *
 * /post/create:
 *  post:
 *     summary: create post
 *     tags:
 *        -   Post
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                     $ref: "#/components/schemas/createPost"
 *     responses:
 *          201:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/update/{id}:
 *  put:
 *     summary: update post
 *     tags:
 *        -   Post
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                     $ref: "#/components/schemas/updatePost"
 *     parameters:
 *          - in: path
 *            name: id
 *            type: number
 *     responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/delete/{id}:
 *  delete:
 *     summary: delete post
 *     tags:
 *        -   Post
 *     parameters:
 *          - in: path
 *            name: id
 *            type: number
 *     responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/{id}:
 *  get:
 *     summary: get post
 *     tags:
 *        -   Post
 *     parameters:
 *          - in: path
 *            name: id
 *            type: number
 *     responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/all:
 *  get:
 *     summary: get all post
 *     tags:
 *        -   Post
 *     parameters:
 *          - in: query
 *            name: take
 *            type: number
 *          - in: query
 *            name: skip
 *            type: number
 *          - in: query
 *            name: search
 *            type: string
 *     responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/like/{id}:
 *  put:
 *     summary: like post
 *     tags:
 *        -   Post
 *     parameters:
 *          - in: path
 *            name: id
 *            type: number
 *     responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/dislike/{id}:
 *  delete:
 *     summary: dislike post
 *     tags:
 *        -   Post
 *     parameters:
 *          - in: path
 *            name: id
 *            type: number
 *     responses:
 *          200:
 *              description: success
 */
