/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: Comments Module
 */

/**
 * @swagger
 *
 * components:
 *      schemas:
 *          createComment:
 *              type: object
 *              required:
 *                  -   message
 *              properties:
 *                  message:
 *                      type: string
 */

/**
 * @swagger
 *
 * /post/comment/add/{id}:
 *  post:
 *     summary: create comment
 *     tags:
 *        -   Comments
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                     $ref: "#/components/schemas/createComment"
 *     parameters:
 *          - in: path
 *            name: id
 *            type: number
 *     responses:
 *          201:
 *              description: success
 */

/**
 * @swagger
 *
 * /post/comment/all/{postId}:
 *  get:
 *     summary: get all comment of a post
 *     tags:
 *        -   Comments
 *     parameters:
 *          - in: path
 *            name: postId
 *            type: number
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
 * /post/comment/delete/{postId}/{commentId}:
 *  delete:
 *     summary: delete comment
 *     tags:
 *        -   Comments
 *     parameters:
 *          - in: path
 *            name: postId
 *            type: number
 *          - in: path
 *            name: commentId
 *            type: number
 *     responses:
 *          200:
 *              description: success
 */
