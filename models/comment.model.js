const mongoose = require('mongoose');

const schema = mongoose.Schema(
  // actual blueprint
  {
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  // options
  {
    timestamps: true,
  },
);

schema.pre('find', function() {
  this.populate('user', '-password');
});

const Comment = mongoose.model('comment', schema);

module.exports = Comment;
