const db = require("../../data/dbConfig");

function find() {
  return db("users");
}
function findById(id) {
  return db("users").where("id", id).first();
}
function findBy(filter) {
  return db("users").where(filter);
}
async function insert(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

module.exports = {
  find,
  findBy,
  findById,
  insert,
};
