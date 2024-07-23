// db.js
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Shubham4153:jwlPeUJlnTu5B2wB@cluster0.zqwaqvf.mongodb.net/quiz'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
