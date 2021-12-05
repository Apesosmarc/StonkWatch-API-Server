const express = require("express");
const router = express.Router();

//controllers
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  userLogin,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(userLogin);
router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
