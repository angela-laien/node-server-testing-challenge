
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { name: 'Sausage Mushroom Pizza' },
        { name: 'Mushroom Onion Soup' },
        { name: 'Buffalo Wings' },
        { name: 'Beef Ramen' },
      ]);
    });
};
