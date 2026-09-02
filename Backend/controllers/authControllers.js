const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const handleErrors = err => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message && err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// SIGNUP
module.exports.signup_post = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// LOGIN
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// GET LOGGED-IN USER
module.exports.user_get = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// LOGOUT
module.exports.logout_post = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0)
  });

  res.status(200).json({ message: "Logged out successfully" });
};




