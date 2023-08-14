/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE places(
    id SERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL DEFAULT 'NEW PLACE',
    amount INTEGER NOT NULL,
    date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    dateAdded timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER REFERENCES users(id) NOT NULL
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE places;
  `);
};
