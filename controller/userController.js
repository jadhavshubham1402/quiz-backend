const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getOneUser,
  createUser,
  getAllUser,
  createTopic,
  getAllTopic,
  updateUser,
} = require("../service/userService");
const User = require("../model/user");

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid Credentials");
    }
    let user = await getOneUser({
      email,
    }).lean();

    if (!user) {
      throw Error("User not found");
    }

    let compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      const token = jwt.sign({ user }, process.env.PRIVATE_KEY, {
        expiresIn: "1d",
        algorithm: "HS256",
      });

      delete user.password;
      delete user.topicScore;

      res.json({
        code: 200,
        user,
        token,
        message: "welcome",
      });
    } else {
      res.status(401).send({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function register(req, res, next) {
  try {
    let { name, email, password } = req.body;

    let userData = await getOneUser({
      email,
    }).lean();

    if (userData) {
      throw Error("User already exist");
    }

    password = bcrypt.hashSync(password, 10);

    await createUser({
      name,
      email,
      password,
    });

    res.json({
      code: 201,
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
}

async function getOneUserData(req, res, next) {
  try {
    let userData = await getOneUser({
      email: req.decoded.user.email,
    }).lean();

    if (!userData) {
      throw Error("User not found");
    }

    res.json({
      code: 200,
      data: userData,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

async function getAllUserData(req, res, next) {
  try {
    const userData = await getAllUser();
    res.json({
      code: 200,
      data: userData,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

async function updateScore(req, res, next) {
  try {
    let { topic, score } = req.body;
    const filter = {
      email: req.decoded.user.email,
    //   "topicScore.topic": { $ne: topic },
    };
    const update = {
      $addToSet: {
        topicScore: { topic: topic, score: score },
      },
      $set: {
        "topicScore.$[elem].score": score,
      },
    };
    const options = {
      arrayFilters: [{ "elem.topic": topic }],
      new: true, 
      upsert: true, 
    };

    const result = await updateUser(filter, update, options);

    if (result.nModified === 0) {
      throw new Error("User not found or topic already updated");
    }

    const updatedUser = await getOneUser({ email: req.decoded.user.email });
    res.json({
      code: 200,
      data: updatedUser,
      message: "Score Updated",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

async function createTopics(req, res, next) {
  try {
    const create = await createTopic(req.body);
    res.json({
      code: 201,
      data: create,
      message: "topic created",
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

async function getAllTopics(req, res, next) {
  try {
    let { topic } = req.body;
    const getTopics = await getAllTopic(topic);
    res.json({
      code: 200,
      data: getTopics,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = {
  loginUser,
  register,
  getOneUserData,
  getAllUserData,
  updateScore,
  createTopics,
  getAllTopics,
};
