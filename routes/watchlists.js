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
router
  .route("/:listId")
  .get(getOneWatchlist)
  .delete(deleteWatchlist)
  .patch(addStockToWatchlist);

router.route("/stock/:listId").delete(deleteStockFromWatchlist);

module.exports = router;
