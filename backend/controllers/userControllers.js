import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User has already registered" });
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
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
