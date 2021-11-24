const express = require("express");
const router = express.Router();
//controllers
const { getAllUsers, createUser, getUser } = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser);

module.exports = router;
