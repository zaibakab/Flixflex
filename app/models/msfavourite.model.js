const mongoose = require("mongoose");

const Msfavourite = mongoose.model(
    "Msfavourite",
    new mongoose.Schema({
        adult: Boolean,
        backdrop_path: String,
        genre_ids: [Number],
        id: Number,
        original_language: String,
        original_title: String,
        overview: String,
        popularity: Number,
        poster_path: String,
        release_date: Date,
        title: String,
        video: Boolean,
        vote_average: Number,
        vote_count: Number,

        // Ajout de la référence à l'ID de l'utilisateur
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    })
);

module.exports = Msfavourite;
