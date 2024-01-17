/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          uploadProfile:
 *              type: object
 *              required:
 *                  -   profile
 *              properties:
 *                  profile:
 *                      type: file
 *          updateInfo:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  bio:
 *                      type: string
 *                  gender:
 *                      type: string
 *                      enum: ["male", "female", "other"]
 *          sendToken:
 *              type: object
 *              required:
 *                  -   email
 *              properties:
 *                  email:
 *                      type: email
 */

/**
 * @swagger
 *
 * /user/{username}:
 *  get:
 *     summary: Get a user
 *     tags:
 *        -   User
 *     parameters:
 *          - in: path
 *            name: username
 *            type: string
 *
 *     responses:
 *         200:
 *             description: success
 */

/**
 * @swagger
 *
 * /user/upload-profile:
 *  patch:
 *     summary: upload profile image
 *     tags:
 *        -   User
 *     requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: "#/components/schemas/uploadProfile"
 *     responses:
 *         200:
 *             description: success
 */

/**
 * @swagger
 *
 * /user/update-info:
 *  put:
 *     summary: update profile info
 *     tags:
 *        -   User
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/updateInfo"
 *
 *     responses:
 *         200:
 *             description: success
 */

/**
 * @swagger
 *
 * /user/verify-email:
 *  post:
 *     summary: send verify token to email
 *     tags:
 *        -   User
 *     requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/sendToken"
 *
 *     responses:
 *         200:
 *             description: success
 */

/**
 * @swagger
 *
 * /user/verify/{token}:
 *  get:
 *     summary: Verify token
 *     tags:
 *        -   User
 *     parameters:
 *          - in: path
 *            name: token
 *            type: string
 *
 *     responses:
 *         200:
 *             description: success
 */

/**
 * @swagger
 *
 * /user/follow/{follower}:
 *  post:
 *     summary: follow user
 *     tags:
 *        -   User
 *     parameters:
 *          - in: path
 *            name: follower
 *            type: string
 *
 *     responses:
 *         200:
 *             description: success
 */

/**
 * @swagger
 *
 * /user/unfollow/{follower}:
 *  post:
 *     summary: follow user
 *     tags:
 *        -   User
 *     parameters:
 *          - in: path
 *            name: follower
 *            type: string
 *
 *     responses:
 *         200:
 *             description: success
 */
