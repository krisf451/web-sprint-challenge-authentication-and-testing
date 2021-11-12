const bcrypt = require("bcryptjs");

const sampleHash = bcrypt.hashSync("1234", 6);

exports.seed = function (knex) {
  return knex("users").insert([
    { username: "sam", password: sampleHash },
    { username: "frodo", password: sampleHash },
    { username: "pippin", password: sampleHash },
    { username: "merry", password: sampleHash },
  ]);
};
