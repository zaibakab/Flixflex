
const axios = require('axios');
const db = require("../models");
const User = db.user;
const Msfavourite = db.msfavourite;

// add movie to favourites
const favouritesMovieFromTMDBApi = async (req, res) => {
    try {

        // Vérifiez l'id du user dans la requete
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized - userId' });
        }
        // Vérifiez si l'utilisateur existe dans la db
        const userExists = await User.findById(req.userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Vérifiez si le movie/serie existe déja 
        const movieSerieFavourite = await Msfavourite.findOne({ id: req.body.id, user: req.userId });
        if (movieSerieFavourite) {
            return res.status(404).json({ error: 'the movie/ Serie already existe' });
        }

        // push movie
        const movieData = req.body;
        movieData.user = req.userId;

        const newMovie = new Msfavourite(movieData);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);

    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};

// delete movie/serie to favourites
const deleteFavouritesMovieFromTMDBApi = async (req, res) => {
    try {

        // Vérifiez l'id du user dans la requete
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized - userId' });
        }
        // Vérifiez si l'utilisateur existe dans la db
        const userExists = await User.findById(req.userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Vérifiez si le movie/serie existe déja 
        const movieSerieFavourite = await Msfavourite.findOne({ id: req.params.id, user: req.userId });
        if (!movieSerieFavourite) {
            return res.status(404).json({ error: 'the movie/ Serie does not existe' });
        }

        // Supprimez le film
        await movieSerieFavourite.remove();
        res.status(204).send(); // 204 No Content pour indiquer que la suppression a réussi


    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};

// get list of all movies/ series in favourites
const getAllFavouritesMovieFromTMDBApi = async (req, res) => {
    try {

        // Vérifiez l'id du user dans la requete
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized - userId' });
        }
        // Vérifiez si l'utilisateur existe dans la db
        const userExists = await User.findById(req.userId);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Récupérez tous les films de la base de données pour un utilisateur spécifique
        const favourites = await Msfavourite.find({ user: req.userId });

        res.status(200).json({ favourites: favourites });


    } catch (error) {
        console.error('Erreur lors de la requête Axios :', error.message);
        res.status(500).send('Erreur lors de la requête Axios');
    }
};




// Exporter la fonction du contrôleur pour l'utiliser dans d'autres fichiers
module.exports = {
    favouritesMovieFromTMDBApi,
    deleteFavouritesMovieFromTMDBApi,
    getAllFavouritesMovieFromTMDBApi
};