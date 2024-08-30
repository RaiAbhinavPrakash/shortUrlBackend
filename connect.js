const mongoose = require("mongoose");

function connectToMongoDb(url) {
  mongoose.connect(url).then(() => console.log("mongoDb Connected"));
}

module.exports = { connectToMongoDb };
