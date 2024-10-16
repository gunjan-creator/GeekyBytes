const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../verifyToken");
//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await Post.updateMany(
      { userId: req.params.id },
      { $set: { username: req.body.username } }
    );

    // Update the username in the Comment model
    await Comment.updateMany(
      { userId: req.params.id },
      { $set: { author: req.body.username } }
    );
    //new token
    const token = jwt.sign(
      {
        _id: req.params.id,
        username: req.body.username,
        email: req.body.email,
      },
      process.env.SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true })
      .status(200)
      .json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
