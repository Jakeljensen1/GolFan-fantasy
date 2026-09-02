const User = require("../models/User");

module.exports = async function requireAdmin(req, res, next) {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Authorization failed" });
  }
};