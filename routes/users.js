const express = require("express");
const router = express.Router();
//controllers
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
