const controller = require('../controllers/serie.controller');

/**
 * @swagger
 * tags:
 *   name: Series
 *   description: Endpoints pour la gestion des séries
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
     * /api/serie/series:
     *   get:
     *     summary: Récupère toutes les séries (ordonnées par popularité)
     *     tags: [Series]
     *     responses:
     *       '200':
     *         description: Liste de séries récupérée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Serie'
     */
    app.get('/api/serie/series', controller.fetchSeriesFromTMDBApi);

    /**
     * @swagger
     * /api/serie/series5:
     *   get:
     *     summary: Récupère les cinq meilleures séries
     *     tags: [Series]
     *     responses:
     *       '200':
     *         description: Liste des cinq meilleures séries récupérée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Serie'
     */
    app.get('/api/serie/series5', controller.fetchTop5SeriesFromTMDBApi);

    /**
     * @swagger
     * /api/serie/series/batch:
     *   get:
     *     summary: Récupère dix séries par page
     *     tags: [Series]
     *     responses:
     *       '200':
     *         description: Liste de dix séries récupérée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Serie'
     */
    app.get('/api/serie/series/batch', controller.fetchSeriesBatchOf10FromTMDBApi);

    /**
     * @swagger
     * /api/serie/search:
     *   get:
     *     summary: Recherche de séries
     *     tags: [Series]
     *     parameters:
     *       - in: query
     *         name: query
     *         schema:
     *           type: string
     *         required: true
     *         description: Le terme de recherche pour les séries
     *     responses:
     *       '200':
     *         description: Liste de séries correspondant à la recherche récupérée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Serie'
     */
    app.get('/api/serie/search', controller.serachSerieFromTMDBApi);

    /**
     * @swagger
     * /api/serie/details/{seriesId}:
     *   get:
     *     summary: Récupère les détails d'une série
     *     tags: [Series]
     *     parameters:
     *       - in: path
     *         name: seriesId
     *         schema:
     *           type: integer
     *         required: true
     *         description: L'ID de la série pour récupérer les détails
     *     responses:
     *       '200':
     *         description: Détails de la série récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Serie'
     */
    app.get('/api/serie/details/:seriesId', controller.detailsSeriesFromTMDBApi);

    /**
     * @swagger
     * /api/serie/video/{series_id}:
     *   get:
     *     summary: Récupère la bande-annonce d'une série
     *     tags: [Series]
     *     parameters:
     *       - in: path
     *         name: series_id
     *         schema:
     *           type: integer
     *         required: true
     *         description: L'ID de la série pour récupérer la bande-annonce
     *     responses:
     *       '200':
     *         description: Bande-annonce de la série récupérée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     */
    app.get('/api/serie/video/:series_id', controller.videoSerieFromTMDBApi);
};