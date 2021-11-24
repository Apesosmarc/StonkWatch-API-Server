// import watchlsit model here
const User = require("../models/Users");

const getAllUsers = async (req, res) => {
  //empty obj in find = fetch all
  try {
    const users = await User.find({});

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  console.log("request received");
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(500).send("no user found");
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send(`user:${userId} not found`);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
};
