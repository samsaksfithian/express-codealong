const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('comment', schema);

module.exports = Comment;
