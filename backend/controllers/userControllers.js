import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check user exists or not
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User has already registered");
    }

    // creating a new user
    const newUser = await User.create({ name, email, password });
    return res.status(201).json({
      _id: newUser._id,
      avatar: newUser.avatar,
      name: newUser.name,
      email: newUser.email,
      verified: newUser.verificationCode,
      admin: newUser.admin,
      token: await newUser.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }
    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verificationCode,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verificationCode,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found");
      statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
