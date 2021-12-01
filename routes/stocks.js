const express = require("express");
const router = express.Router();
//controllers
const { deleteStockFromWatchlist } = require("../controllers/watchlists");

router.route("/:listId").delete(deleteStockFromWatchlist);

module.exports = router;
