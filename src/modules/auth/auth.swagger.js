/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          register:
 *              type: object
 *              required:
 *                  -   username
 *                  -   password
 *                  -   gender
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                  gender:
 *                      type: string
 *                      enum: [ "male", "female", "other"]
 *          login:
 *              type: object
 *              required:
 *                  -   username
 *                  -   password
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 */

/**
 * @swagger
 *
 * /auth/register:
 *  post:
 *      summary: register account
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/register"
 *      responses:
 *          201:
 *              description: success
 */

/**
 * @swagger
 *
 * /auth/login:
 *  post:
 *      summary: login account
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          200:
 *              description: success
 */
