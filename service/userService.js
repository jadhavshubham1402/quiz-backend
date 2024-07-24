const user = require("../model/user");
const topic = require("../model/topic");

function getAllUser(page, limit) {
  return user.find().skip((page - 1) * limit)
    .limit(limit);
}

function getOneUser(data) {
  return user.findOne(data);
}

function createUser(userData) {
  return user.create(userData);
}

function updateUser(filter, update, options={}) {
  return user.findOneAndUpdate(filter, update, options);
}

function getAllTopic(data) {
  return topic.find(data);
}

function createTopic(userData) {
  return topic.create(userData);
}

module.exports = {
  getOneUser,
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  getAllTopic,
  createTopic,
};
