const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt; // read JWT from cookie

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // attach user ID to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};


