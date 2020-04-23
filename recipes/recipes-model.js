const db = require("../data/dbConfig.js");

module.exports = {
    getAll,
    findById,
    insert,
    update,
    remove
};

function getAll() {
    return db('recipes');
}

function findById(id) {
    return db('recipes')
        .where({ id })
        .first();
}

async function insert(recipe) {
    return db('recipes').insert(recipe, "id");
}

function update(changes, id) {
    return db('recipes')
        .update(changes)
        .where({ id });
}

function remove(id) {
    return db('recipes')
        .where({ id })
        .del()
}