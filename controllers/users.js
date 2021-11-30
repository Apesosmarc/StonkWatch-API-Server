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
  if (req.body.userId) {
    const { userId } = req.body;
    // checks if userId is a valid Mongoose ObjectID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({
        doesExist: false,
        msg: "Not a valid ID token",
      });
    }

    // checks if user exists, return boolean
    const doesExist = await User.exists({
      _id: req.body.userId,
    });
    return res.status(200).json({ doesExist, msg: "User Found" });
  }

  const users = await User.find({});
  res.status(200).json({ users });
});

const createUser = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  res.status(201).json({ newUser });
});

const getUser = asyncWrapper(async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({
    _id: userId,
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
};
