const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
            SELECT * FROM videogames;
        `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body1, body2, body3, body4, body5, body6) {
    try {
        const { rows: [newGame] } = await client.query(`
            INSERT INTO videoGames (name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [body1, body2, body3, body4, body5, body6])
        return newGame;
    } catch(error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, gArray = {}) {
    const setGameString = Object.keys(gArray).map((key, index) => `"${key}" = $${index + 1}`).join(', ');
    if (setGameString.length === 0) {return;}

    try {
        const { rows: [vGame] } = await client.query(`
            UPDATE videoGames
            SET ${setGameString}
            WHERE id = ${id}
            RETURNING *;
        `, Object.values(gArray));
        return vGame;
    } catch(error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rows: [game] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `, [id]);
        return game;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}