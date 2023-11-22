/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE places_users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(120) NOT NULL
  )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE places_users;
  `);
};
