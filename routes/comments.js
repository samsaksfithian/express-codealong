// ========================================================================
// ========================================================================
// Imports

const express = require('express');
const Comment = require('../models/comment.model');
const User = require('../models/user.model');

const router = express.Router();

// ========================================================================
// ========================================================================
// READ

// GET /comments?filter="your text here"
// get all comments
router.get('/', (request, response) => {
  Comment.find()
    .where('text')
    .regex(request.query.filter || '')
    .then(comments => response.json(comments));
}); // Read All

// ========================================================================

// get a single comment by id
router.get(`/:id`, (request, response) => {
  Comment.findById(request.params.id)
    .then(comment =>
      comment
        ? response.json(comment)
        : response.status(404).json({ message: 'Invalid ID' }),
    )
    .catch(err => response.status(500).json(err));
}); // Read One

// ========================================================================
// ========================================================================
// CREATE

// create a comment
router.post('/', (request, response) => {
  if (!request.body.text || !request.body.userId) {
    return response
      .status(400)
      .json({ message: 'Invalid syntax: please provide comment text and a userId' });
  } // json function ends the call and kicks you out

  Comment.create({ text: request.body.text, user: request.body.userId })
    .then(comment =>
      User.findByIdAndUpdate(request.body.userId, { $push: { comments: comment._id } }),
    )
    .then(() => Comment.find())
    .then(comments =>
      response.status(201).json({ message: 'Comment successfully added', comments }),
    );
});

// ========================================================================
// ========================================================================
// UPDATE

// edit/update a comment
router.patch('/:id', (request, response) => {
  if (!request.body.text) {
    return response
      .status(400)
      .json({ message: 'Invalid syntax: please provide comment text' });
  }

  Comment.findByIdAndUpdate(request.params.id, { text: request.body.text })
    .then(comment => (comment ? Comment.find() : Promise.reject(new Error('Invalid ID'))))
    .then(comments =>
      response.json({ message: 'Comment successfully updated', comments }),
    )
    .catch(err =>
      err.message === 'Invalid ID'
        ? response.status(404).json({ message: err.message })
        : response.status(500).json(err),
    );
});

// ========================================================================
// ========================================================================
// DELETE

// delete a comment
router.delete('/:id', async (request, response) => {
  // Comment.findByIdAndDelete(request.params.id)
  //   .then(comment => (comment ? Comment.find() : Promise.reject(new Error('Invalid ID'))))
  //   .then(comments =>
  //     response.json({ message: 'Comment successfully deleted', comments }),
  //   )
  //   .catch(err =>
  //     err.message === 'Invalid ID'
  //       ? response.status(404).json({ message: err.message })
  //       : response.status(500).json(err),
  //   );
  try {
    const deletedComment = await Comment.findByIdAndDelete(request.params.id);
    if (!deletedComment)
      return response
        .status(404)
        .json({ message: 'Comment not found: Please provide a valid ID' });
    const comments = await Comment.find();
    response.status(200).json({
      message: 'Comment successfully deleted',
      comments,
    });
  } catch (err) {
    response.status(500).json(err);
  }
});

// ========================================================================
// ========================================================================

module.exports = router;

// ========================================================================
// ========================================================================
