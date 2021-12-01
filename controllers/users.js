const { User } = require("../models/Users");
const mongoose = require("mongoose");
//async wrapper middleware for refactor
const asyncWrapper = require("../middlewares/asyncWrapper");
//custom error class creator
const { createCustomError } = require("../errors/custom-error");

const checkIfExists = (userId, next) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(createCustomError(`No list found with Id: ${userId}`, 404));
  }
};

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

const createUser = asyncWrapper(async (req, res) => {
  // const newUser = await User.create(req.body);
  // res.status(201).json({ newUser });
});

const userLogin = asyncWrapper(async (req, res) => {
  // first should see if user exists in DB
  const existsInDB = await User.exists({
    OAuthId: req.body.OAuthId,
  });

  if (existsInDB) {
    return res.status(200).json({ existsInDB });
  }

  if (!existsInDB) {
    await User.create(req.body);
    return res.status(201).json({ createdStatus: "new" });
  }
});

const getUser = asyncWrapper(async (req, res) => {
  const { id: OAuthId } = req.params;

  const user = await User.findOne({
    OAuthId,
  });

  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }
  res.status(200).json({ user });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;

  const user = await User.findOneAndDelete({ _id: userId });
  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }
  res.status(200).json({ status: "deleted" });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;

  // findOneUpdate(filter, desired update,options obj, new:true = returns item AFTER update )
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    req.body,
    { new: true }
  );

  if (!user) {
    return next(createCustomError(`No user with id ${userId}`, 404));
  }

  res.status(200).json({ user });
});

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  userLogin,
};
