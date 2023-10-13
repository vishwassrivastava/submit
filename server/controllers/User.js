import mongoose from "mongoose";
import UserInfo from "../models/UserInfo.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const user = await UserInfo.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).send("wrong credientials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, ...other } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
};

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UserInfo({ ...req.body, password: hash });
    await newUser.save();

    return res.status(200).send("user have been created");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

export const getDetails = async (req, res) => {
  try {
    const user = await UserInfo.findOne({ name: req.body.name });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
