const axios = require('axios');
const db = require("../models");
const User = db.user;
const Msfavourite = db.msfavourite;


const fetchMoviesFromTMDBApi = async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US', {
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


// fetch top 5 movies
const fetchTop5MoviesFromTMDBApi = async (req, res) => {
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


// fetch movies 10 in One page
const fetchMoviesBatchOf10FromTMDBApi = async (req, res) => {
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

// search for movie with params (name, year, region)
const serachMovieFromTMDBApi = async (req, res) => {
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
        const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
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


// Get the details of a Movie.
const detailsMoviesFromTMDBApi = async (req, res) => {
    try {

        // récuperer seriesID
        const moviesId = req.params.moviesId;
        console.log(moviesId)
        // vérifie si le query existe 
        if (!moviesId) {
            throw new Error('Le paramètre de recherche "seriesId" est obligatoire.');
        }



        // Effectuer la requête GET vers l'API TMDb avec le paramètre de page
        const response = await axios.get("https://api.themoviedb.org/3/movie/" + moviesId, {
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

// Get the video of a Movie.
const videoMovieFromTMDBApi = async (req, res) => {
    try {

        // récuperer seriesID
        const moviesId = req.params.moviesId;
        console.log(moviesId)
        // vérifie si le query existe 
        if (!moviesId) {
            throw new Error('Le paramètre de recherche "seriesId" est obligatoire.');
        }



        // Effectuer la requête GET vers l'API TMDb avec le paramètre de page
        const response = await axios.get("https://api.themoviedb.org/3/movie/" + moviesId + "/videos", {
            headers: {
                'Authorization': 'Bearer '+process.env.TMDB_API_read_access_token
            },
            params: {
                language: 'en-US'
            },
        });

        // Envoyer les données en réponse
        res.status(200).json("https://www.youtube.com/watch?v=" + response.data.results[0].key);
    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};







module.exports = {
    fetchMoviesFromTMDBApi,
    fetchTop5MoviesFromTMDBApi,
    fetchMoviesBatchOf10FromTMDBApi,
    serachMovieFromTMDBApi,
    detailsMoviesFromTMDBApi,
    videoMovieFromTMDBApi,
};