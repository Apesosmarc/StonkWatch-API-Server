// import watchlsit model here
const { User } = require("../models/Users");
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

// requests user obj then parses the correct list from list id
const getOneWatchlist = asyncWrapper(async (req, res, next) => {
  const { listId } = req.params;
  const userId = req.body.userId;

  // if its nto a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return next(createCustomError(`No user with id: ${userId}`, 404));
  }

  const watchlist = user.watchlists.find((list) => (list._id = listId));

  if (!watchlist) {
    return next(
      createCustomError(`No watchlist found with id: ${listId}`, 404)
    );
  }

  res.status(200).json({
    watchlist,
  });
});

// uses findOne callback to access desired data in database, saves and responds in callback
const deleteWatchlist = asyncWrapper(async (req, res, next) => {
  const OAuthId = req.body.OAuthId;
  const listId = req.params.listId;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne(
    {
      OAuthId,
    },
    (err, result) => {
      if (!result || err) {
        return err;
      }

      result.watchlists = result.watchlists.filter(
        (list) => list._id != req.params.listId
      );
      result.save();

      res.status(201).json({ result });
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${OAuthId}`, 404));
  }
});

const createWatchlist = asyncWrapper(async (req, res, next) => {
  const { OAuthId, formValues } = req.body;

  const user = await User.findOne(
    {
      OAuthId,
    },
    (err, result) => {
      if (!result || err) return err;

      result.watchlists.push(formValues);

      result.save();
      return res.status(201).json({ result });
    },
    { new: true }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${OAuthId}`, 404));
  }
});

const addStockToWatchlist = asyncWrapper(async (req, res, next) => {
  const { OAuthId, stock } = req.body;
  const listId = req.params.listId;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne(
    {
      OAuthId,
    },
    (err, result) => {
      if (!result || err) return err;

      result.watchlists.forEach((list, index) => {
        if (list._id == listId) {
          list.stocks.push(stock);
        }
      });

      result.save();
      return res.status(201).json({ result });
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${OAuthId}`, 404));
  }
});

const deleteStockFromWatchlist = asyncWrapper(async (req, res, next) => {
  const { OAuthId, stock } = req.body;
  const listId = req.params.listId;

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return next(createCustomError(`No list found with Id: ${listId}`, 404));
  }

  const user = await User.findOne(
    {
      OAuthId,
    },
    (err, result) => {
      if (err || !result) return err;

      result.watchlists.forEach((list, index) => {
        if ((list._id = listId)) {
          // creates copy of stock array that is to be filtered; an attempt to make code readable
          const targetList = result.watchlists[index].stocks;

          result.watchlists[index].stocks = targetList.filter(
            (stockName) => stockName != stock
          );
        }
      });
      result.save();
      return res.status(201).json({ result });
    }
  ).clone();

  if (!user) {
    return next(createCustomError(`No user with id ${OAuthId}`, 404));
  }
});

module.exports = {
  getAllWatchlists,
  getOneWatchlist,
  createWatchlist,
  deleteWatchlist,
  addStockToWatchlist,
  deleteStockFromWatchlist,
};
