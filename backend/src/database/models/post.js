const mongoose = require("mongoose");

const { Schema } = mongoose;
const crypto = require("crypto");
const { secret } = require("config/serverconfig.json");

const ReComment = Schema({
  id: { type: Number, require: true, unique: true },
  author: { type: String, require: true, unique: false },
  content: { type: String, require: true, unique: false },
  password: { type: String, require: true, unique: false },
  created: { type: Date, require: true, unique: false, default: Date.now }
});

const Comment = Schema({
  id: { type: Number, require: true, unique: true },
  author: { type: String, require: true, unique: false },
  content: { type: String, require: true, unique: false },
  password: { type: String, require: true, unique: false },
  created: { type: Date, require: true, unique: false, default: Date.now },
  recomments: { type: [ReComment], require: false, unique: false }
});

const Post = Schema(
  {
    id: { type: Number, require: true, unique: true },
    author: { type: String, require: true, unique: false },
    title: { type: String, require: true, unique: false },
    content: { type: String, require: true, unique: false },
    created: { type: Date, require: true, unique: false, default: Date.now },
    password: { type: String, require: true, unique: false },
    comments: { type: [Comment], require: false, unique: false }
  },
  {
    collection: "post"
  }
);

Post.statics.create = function(id, author, title, content, password) {
  const resultPassword = crypto
    .createHmac("sha1", secret)
    .update(password)
    .digest("base64");

  return new this({
    id,
    author,
    title,
    content,
    password: resultPassword
  }).save();
};

Post.methods.checkPassword = function(password) {
  const resultPassword = crypto
    .createHmac("sha1", secret)
    .update(password)
    .digest("base64");
  return this.password === resultPassword;
};

Post.statics.cryptoPassword = function(password) {
  const resultPassword = crypto
    .createHmac("sha1", secret)
    .update(password)
    .digest("base64");
  return resultPassword;
};

module.exports = mongoose.model("Post", Post);
