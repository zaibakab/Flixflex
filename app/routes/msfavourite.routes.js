const { authJwt } = require("../middlewares");
const controller = require('../controllers/msfavourite.controller');

/**
 * @swagger
 * tags:
 *   name: Favourites
 *   description: Endpoints pour la gestion des favoris
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
     * /api/movie/favourites:
     *   post:
     *     summary: Ajoute un film aux favoris
     *     tags: [Favourites]
     *     security:
     *       - JWT: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FavouriteMovie'
     *     responses:
     *       '201':
     *         description: Film ajouté aux favoris avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FavouriteMovie'
     */
    app.post('/api/movie/favourites', [authJwt.verifyToken], controller.favouritesMovieFromTMDBApi);

    /**
     * @swagger
     * /api/movie/favourites/{id}:
     *   delete:
     *     summary: Supprime un film des favoris
     *     tags: [Favourites]
     *     security:
     *       - JWT: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: L'ID du film à supprimer des favoris
     *     responses:
     *       '200':
     *         description: Film supprimé des favoris avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FavouriteMovie'
     */
    app.delete('/api/movie/favourites/:id', [authJwt.verifyToken], controller.deleteFavouritesMovieFromTMDBApi);

    /**
     * @swagger
     * /api/movie/favourites:
     *   get:
     *     summary: Récupère la liste de tous les films en favoris
     *     tags: [Favourites]
     *     security:
     *       - JWT: []
     *     responses:
     *       '200':
     *         description: Liste de films en favoris récupérée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FavouriteMovie'
     */
    app.get('/api/movie/favourites', [authJwt.verifyToken], controller.getAllFavouritesMovieFromTMDBApi);
};