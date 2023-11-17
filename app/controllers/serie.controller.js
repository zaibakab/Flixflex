const axios = require('axios');

// Fonction du contrôleur qui effectue une requête avec Axios
const fetchSeriesFromTMDBApi = async (req, res) => {
    try {
        // Exemple de requête GET avec Axios
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular?language=en-US', {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            }
        });
        // Récupérer les données de la réponse
        const responseData = response.data;

        // Envoyer les données en réponse
        res.status(200).json(responseData);
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};


// fetch top 5 series
const fetchTop5SeriesFromTMDBApi = async (req, res) => {
    try {
        // Exemple de requête GET avec Axios
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US', {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            }
        });

        // Récupérer les 5 premiers éléments de la réponse
        const top5Results = response.data.results.slice(0, 5);
        // Envoyer les données en réponse
        res.status(200).json(top5Results);
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};


// fetch series (10 in One page)
const fetchSeriesBatchOf10FromTMDBApi = async (req, res) => {
    const itemsPerPage = 10;
    try {
        // Récupérer le numéro de page à partir des paramètres de requête
        const page = req.query.page || 1;

        // Effectuer la requête GET vers l'API TMDb avec le paramètre de page
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US", {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            },
            params: {
                page: page,
            },
        });

        // Récupérer les 10 premiers items de la réponse
        const slicedResults = response.data.results.slice(0, itemsPerPage);

        // Envoyer les données en réponse
        res.status(200).json(slicedResults);
    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};


// search for serie with params (name, year, region)
const serachSerieFromTMDBApi = async (req, res) => {
    const itemsPerPage = 10;
    try {
        // vérifie si le query existe 
        if (!req.query.query) {
            throw new Error('Le paramètre de recherche "query" est obligatoire.');
        }

        // Récupérer les query params à partir des paramètres de requête
        const query = req.query.query;
        const year = req.query.year;
        const region = req.query.region;

        // Effectuer la requête GET vers l'API TMDb avec le paramètre de page
        const response = await axios.get("https://api.themoviedb.org/3/search/tv", {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            },
            params: {
                query: query,
                year: year,
                region: region
            },
        });

        // Envoyer les données en réponse
        res.status(200).json(response.data.results);
    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};

// Get the details of a Serie.
const detailsSeriesFromTMDBApi = async (req, res) => {
    try {

        // récuperer seriesID
        const seriesId = req.params.seriesId;
        console.log(seriesId)
        // vérifie si le query existe 
        if (!seriesId) {
            throw new Error('Le paramètre de recherche "seriesId" est obligatoire.');
        }



        // Effectuer la requête GET vers l'API TMDb avec le paramètre de page
        const response = await axios.get("https://api.themoviedb.org/3/tv/" +seriesId, {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            },
            params: {
                language: 'en-US'
            },
        });

        // Envoyer les données en réponse
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};

// Get the video of a series
const videoSerieFromTMDBApi = async (req, res) => {
    try {

        // récuperer seriesID
        const series_id = req.params.series_id;
        console.log(series_id)
        // vérifie si le query existe 
        if (!series_id) {
            throw new Error('Le paramètre de recherche "seriesId" est obligatoire.');
        }



        // Effectuer la requête GET vers l'API TMDb avec le paramètre de page
        const response = await axios.get("https://api.themoviedb.org/3/tv/"+series_id+"/videos", {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            },
            params: {
                language: 'en-US'
            },
        });

        // Envoyer les données en réponse
        res.status(200).json("https://www.youtube.com/watch?v="+response.data.results[0].key);
    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};


// Exporter la fonction du contrôleur pour l'utiliser dans d'autres fichiers
module.exports = {
    fetchSeriesFromTMDBApi,
    fetchTop5SeriesFromTMDBApi,
    fetchSeriesBatchOf10FromTMDBApi,
    serachSerieFromTMDBApi,
    detailsSeriesFromTMDBApi,
    videoSerieFromTMDBApi
};