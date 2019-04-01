// ========================================================================
// ========================================================================
// Imports

const router = require('express').Router();
const User = require('../models/user.model');

// ========================================================================
// ========================================================================
// CREATE

// Add a user
router.post('/signup', (request, response) => {
  if (!request.body.username || !request.body.password) {
    return response
      .status(400)
      .json({ message: 'Invalid syntax: please provide a username and password' });
  }
  // create a new User
  User.create({
    username: request.body.username,
    // TODO: more robust password hashing
    password: request.body.password,
  })
    .then(user => {
      const userObj = user.toObject();
      delete userObj.password;
      return response
        .status(201)
        .json({ message: `User '${user.username}' successfully created`, user: userObj });
    })
    .catch(err => response.status(500).json(err));
});
// ========================================================================
// ========================================================================

module.exports = router;

// ========================================================================
// ========================================================================
