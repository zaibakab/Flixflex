const controller = require('../controllers/movie.controller');

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints pour la gestion des films
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
   * /api/movie/movies:
   *   get:
   *     summary: Récupère tous les films (ordonnés par popularité)
   *     tags: [Movies]
   *     responses:
   *       '200':
   *         description: Liste de films récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *                 
   */
  app.get('/api/movie/movies', controller.fetchMoviesFromTMDBApi);

  /**
   * @swagger
   * /api/movie/movies5:
   *   get:
   *     summary: Récupère les cinq meilleurs films
   *     tags: [Movies]
   *     responses:
   *       '200':
   *         description: Liste des cinq meilleurs films récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *                 
   */
  app.get('/api/movie/movies5', controller.fetchTop5MoviesFromTMDBApi);

  /**
   * @swagger
   * /api/movie/movies/batch:
   *   get:
   *     summary: Récupère dix films par page
   *     tags: [Movies]
   *     responses:
   *       '200':
   *         description: Liste de dix films récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *                 
   */
  app.get('/api/movie/movies/batch', controller.fetchMoviesBatchOf10FromTMDBApi);

  /**
   * @swagger
   * /api/movie/search:
   *   get:
   *     summary: Recherche de films
   *     tags: [Movies]
   *     parameters:
   *       - in: query
   *         name: query
   *         schema:
   *           type: string
   *         required: true
   *         description: Le terme de recherche pour les films
   *     responses:
   *       '200':
   *         description: Liste de films correspondant à la recherche récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *                 
   */
  app.get('/api/movie/search', controller.serachMovieFromTMDBApi);

  /**
   * @swagger
   * /api/movie/details/{moviesId}:
   *   get:
   *     summary: Récupère les détails d'un film
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: moviesId
   *         schema:
   *           type: integer
   *         required: true
   *         description: L'ID du film pour récupérer les détails
   *     responses:
   *       '200':
   *         description: Détails du film récupérés avec succès
   *         content:
   *           application/json:
   *             schema:
   *               
   */
  app.get('/api/movie/details/:moviesId', controller.detailsMoviesFromTMDBApi);

  /**
   * @swagger
   * /api/movie/video/{moviesId}:
   *   get:
   *     summary: Récupère la bande-annonce d'un film
   *     tags: [Movies]
   *     parameters:
   *       - in: path
   *         name: moviesId
   *         schema:
   *           type: integer
   *         required: true
   *         description: L'ID du film pour récupérer la bande-annonce
   *     responses:
   *       '200':
   *         description: Bande-annonce du film récupérée avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   */
  app.get('/api/movie/video/:moviesId', controller.videoMovieFromTMDBApi);
};