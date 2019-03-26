// ========================================================================
// ========================================================================
// Imports

const express = require('express');
const shortid = require('shortid');
const moment = require('moment');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const commentData = require('../data');
const Comment = require('../models/comment.model');

// ========================================================================

// create the db file if it doesnt exist and seed it with data
const adapter = new FileSync('db.json', {
  defaultValue: { comments: commentData, users: {} },
});

const db = lowdb(adapter);

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

/*
// old GET using lowdb
// GET /comments?filter="your text here"
router.get('/', (request, response) => {
  console.log(request.query);
  let comments = db.get('comments').value();
  if (request.query.filter) {
    const filterText = request.query.filter;
    // prettier-ignore
    comments = comments.filter(
      comment => comment.text.toLowerCase().includes(filterText.toLowerCase()),
    );
  }
  response.status(200).json(comments);
}); // Read All 
*/

// ========================================================================

// get a single comment by id
router.get(`/:id`, (request, response) => {
  const myComment = db
    .get('comments')
    .find({ id: request.params.id })
    .value();
  if (!myComment) {
    response.status(404).json({ msg: 'Invalid ID' });
  }
  response.status(200).json(myComment);
  // response.status(200).json({
  //   msg: 'Found comment',
  //   comments: myComment,
  // });
}); // Read One

// ========================================================================
// ========================================================================
// CREATE

// create a comment
router.post('/', (request, response) => {
  if (!request.body.text) {
    response.status(400).json({ msg: 'Invalid syntax: please provide comment text' });
  } // json function ends the call and kicks you out
  const newComment = {
    text: request.body.text,
    id: shortid.generate(),
    timestamp: moment().format(),
    lastUpdated: moment().format(),
  };
  // add it to commentData
  db.get('comments')
    .push(newComment)
    .write();
  // return all the comments (make sure new comment is included)
  response.status(201).json({
    msg: 'Comment successfully added',
    comments: db.get('comments').value(),
  });
});

// ========================================================================
// ========================================================================
// UPDATE

router.patch('/:id', (request, response) => {
  if (!request.body.text) {
    return response
      .status(400)
      .json({ msg: 'Invalid syntax: please provide comment text' });
  }
  // prettier-ignore
  if (!db.get('comments').find({ id: request.params.id }).value()) {
    return response.status(404).json({ msg: "Invalid ID" });
  }
  db.get('comments')
    .find({ id: request.params.id })
    .assign({ text: request.body.text, lastUpdated: moment().format() })
    .write();
  return response.status(200).json({
    msg: 'Comment text and timestamp successfully updated',
    comments: db.get('comments').value(),
  });
});

// ========================================================================
// ========================================================================
// DELETE

router.delete('/:id', (request, response) => {
  // prettier-ignore
  if (!db.get('comments').find({ id: request.params.id }).value()) {
    return response.status(404).json({ msg: "Invalid ID" });
  }
  db.get('comments')
    .remove({ id: request.params.id })
    .write();
  return response.status(200).json({
    msg: 'Comment successfully removed',
    comments: db.get('comments').value(),
  });
});

// ========================================================================
// ========================================================================

module.exports = router;

// ========================================================================
// ========================================================================
