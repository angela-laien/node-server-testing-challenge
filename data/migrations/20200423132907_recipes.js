
exports.up = function(knex) {
    return knex.schema.createTable('recipes', tbl => {
        tbl.increments();
    
        tbl.string('name', 255).notNullable();
      });
};

exports.down = function(knex) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('recipes');
};
