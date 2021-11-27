// import watchlsit model here
const { User, Watchlist } = require("../models/Users");
//async wrapper middleware for refactor
const asyncWrapper = require("../middlewares/asyncWrapper");
//custom error class creator
const { createCustomError } = require("../errors/custom-error");
const mongoose = require("mongoose");

//returns all user's watchlists
const getAllWatchlists = asyncWrapper(async (req, res) => {
  // use req body userId, watchlistId
  const user = await User.findOne({
    _id: "619fbcb7319361ecccf6de87",
  });

  res.status(200).json({ watchlists: user.watchlists });
});

const getOneWatchlist = asyncWrapper(async (req, res) => {
  const { listId } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne({
    _id: "619fbcb7319361ecccf6de87",
  });

  const watchlist = user.watchlists.find(
    (list) => (list._id = req.params.listId)
  );

  res.status(200).json({
    watchlist,
  });
});

const deleteWatchlist = asyncWrapper(async (req, res) => {
  const { userId } = req.body;
  const listId = req.params.listId;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne(
    {
      _id: "619fbcb7319361ecccf6de85",
    },
    (err, result) => {
      if (!result) {
        return err;
      }

      result.watchlists = result.watchlists.filter(
        (list) => list._id != req.params.listId
      );
      result.save();
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }

  res.status(201).json({ success: true, nbHits: user.watchlists.length - 1 });
});

const createWatchlist = asyncWrapper(async (req, res) => {
  const user = await User.findOne(
    {
      _id: "61a26584d70f328df859aa3c",
    },
    (err, result) => {
      if (!result || err) return err;

      result.watchlists.push(req.body);
      result.save();
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }

  res.status(201).json({ success: true });
});

const addStockToWatchlist = asyncWrapper(async (req, res) => {
  const { userId, stock } = req.body;
  const listId = req.params.listId;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne(
    {
      _id: userId,
    },
    (err, result) => {
      if (!result || err) return err;

      result.watchlists.forEach((list, index) => {
        if ((list._id = listId)) {
          result.watchlists[index].stocks.push(stock);
        }
      });
      result.save();
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }

  res.status(201).json({
    success: true,
    msg: `${stock} has been added to watchlist ${listId}`,
  });
});

const deleteStockFromWatchlist = asyncWrapper(async (req, res, next) => {
  const { userId, stock } = req.body;
  const listId = req.params.listId;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne(
    {
      _id: userId,
    },
    (err, result) => {
      if (err || !result) return;

      result.watchlists.forEach((list, index) => {
        if ((list._id = listId)) {
          // assigns user stock array to filtered version of itself
          const targetList = result.watchlists[index].stocks;
          result.watchlists[index].stocks = targetList.filter(
            (stockName) => stockName != stock
          );
        }
      });
      result.save();
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }

  res.status(201).json({
    success: true,
    msg: `${stock} has been deleted from watchlist ${listId}`,
  });
});

module.exports = {
  getAllWatchlists,
  getOneWatchlist,
  createWatchlist,
  deleteWatchlist,
  addStockToWatchlist,
  deleteStockFromWatchlist,
};
