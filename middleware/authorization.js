const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token,"token")
    if (token) {
      // Function to verify token
      jwt.verify(token, "qwertyuiopasdfghjklzxcvbnm", (err, decoded) => {
        if (err) {
            console.log(err)
          res.json({ success: false, message: "Token invalid" }); // Token has expired or is invalid
        } else {
            console.log("herer")
          req.decoded = decoded; // Assign to req. variable to be able to use it in next() route ('/me' route)
          next(); // Required to leave middleware
        }
      });
    } else {
      res.json({ success: false, message: "No token provided" }); // Return error if no token was provided in the request
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { authorize };
