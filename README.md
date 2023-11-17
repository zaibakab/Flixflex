# Node.js MongoDB – FlixFlex

Node.js app that searches for movies using the TMDB and Mongodb database.

## Powered by 

- [Node.js](https://nodejs.org/en)
- [The Movie Database](https://www.themoviedb.org/)
- [mongodb](https://www.mongodb.com/)


## Developing locally
- Clone
- Create an `.env` file with three constants:
  - `TMDB_API_read_access_token` with the value set to your [TMDB API token](https://www.themoviedb.org/settings/api).
  - `PORT` (optional) with any valid port value.
  - `DATABASE_URL` your db URL.
  - `DB_PORT` your db Port.
  - `secret` your JWT secret code.
- `npm install` in the root folder.
- `node server.js` or `nodemon server.js` in the local folder.
