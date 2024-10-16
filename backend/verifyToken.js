const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json("You are not authenticated");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      res.status(403).json("Token not valid");
    }
    req.userId = data._id;
    console.log("verified");
    next();
  });
};

module.exports = verifyToken;
