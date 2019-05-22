const post = require("database/models/post");

module.exports = () => {
  return post.collection.dropIndexes();
};
