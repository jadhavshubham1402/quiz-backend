const {
  register,
  loginUser,
  getAllUserData,
  getOneUserData,
  createTopics,
  getAllTopics,
  updateScore,
} = require("../controller/userController");
const { authorize } = require("../middleware/authorization");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", loginUser);
router.post("/getAllUser", authorize, getAllUserData);
router.get("/getOneUser", authorize, getOneUserData);
router.post("/updateScore", authorize, updateScore);
router.post("/createTopic", authorize, createTopics);
router.post("/getAllTopic", authorize, getAllTopics);

module.exports = router;
