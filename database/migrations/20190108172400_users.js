exports.up = knex =>
  knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .primary()
      .notNullable()
    table // people be in more than one organization? overoptimazation?
      .uuid('organization_id')
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table.string('first_name', 128).notNullable()
    table.string('last_name', 128).notNullable()
    table.string('role', 128).notNullable() // enumerable datatype? foreigh key to table with all user roles?
    table.string('email')
    table.string('phone')
  })

exports.down = knex => knex.schema.dropTableIfExists('users')
