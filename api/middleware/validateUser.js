const Users = require("../users/users-model");

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    username.trim().length === 0 ||
    password.trim().length === 0
  ) {
    return next({ status: 401, message: "username and password required" });
  }
  const [user] = await Users.findBy({ username });
  if (user) {
    return next({ status: 401, message: "username taken" });
  }
  next();
};
