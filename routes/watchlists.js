const express = require("express");
const router = express.Router();
const {
  getAllWatchlists,
  getOneWatchlist,
  createWatchlist,
  deleteWatchlist,
  addStockToWatchlist,
  deleteStockFromWatchlist,
} = require("../controllers/watchlists");

router.route("/").get(getAllWatchlists).post(createWatchlist);
router.route("/stock/:listId").delete(deleteStockFromWatchlist);
router
  .route("/:listId")
  .get(getOneWatchlist)
  .delete(deleteWatchlist)
  .post(addStockToWatchlist);

module.exports = router;
