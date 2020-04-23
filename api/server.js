const express = require('express');

const Recipes = require('../recipes/recipes-model.js');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get('/recipes', (req, res) => {
  Recipes.getALL()
  .then(recipes => {
    res.status(200).json(recipes);
  })
  .catch(error => {
    res.status(500).json({ error });
  });
});

server.get('/recipes/:id', (req, res) => {
  const { id } = req.params;

  Recipes.findById(id)
  .then(recipe => {
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id.' })
    }
  })
  .catch(error => {
    res.status(500).json({ error: 'Failed to get recipes' });
  });
});

server.post('/recipes', (req, res) => {
  const newRecipe = req.body;

  Recipes.insert(newRecipe)
  .then(ids => {
    res.status(201).json({ message: "Recipe created successfully" });
  })
  .catch (error => {
    res.status(500).json({ errorMessage: error.message });
  });
});

server.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Recipes.findById(id)
  .then(recipe => {
    if (recipe) {
      Recipes.update(changes, id)
      .then(updatedRecipe => {
        res.json(updatedRecipe);
      });
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id' });
    }
  })
  .catch (error => {
    res.status(500).json({ error: 'Failed to update recipe' });
  });
});

server.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;

  Recipes.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find recipe with given id' });
    }
  })
  .catch(error => {
    res.status(500).json({ error: 'Failed to delete recipe' });
  });
});

module.exports = server;