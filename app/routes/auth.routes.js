const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints pour l'authentification
 */

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Inscription d'un nouvel utilisateur
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: Utilisateur enregistré avec succès
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  /**
   * @swagger
   * /api/auth/signin:
   *   post:
   *     summary: Connexion d'un utilisateur existant
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Login'
   *     responses:
   *       '200':
   *         description: Utilisateur connecté avec succès
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthToken'
   */
  app.post("/api/auth/signin", controller.signin);
};