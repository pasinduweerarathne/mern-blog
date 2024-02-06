import { uploadPicture } from "../middleware/updatePicture.js";
import User from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check user exists or not
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User has already registered");
    }

    // chack passwors has the correct length
    if (password.length < 6) {
      throw new Error("Password length must be at least 6 characters");
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

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error("User not found");

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 characters");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile = await user.save();
    res.json({
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verificationCode,
      admin: updatedUserProfile.admin,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
