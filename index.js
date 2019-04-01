// ========================================================================
// ========================================================================
// imports

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const commentsRouter = require('./routes/comments');
const authRouter = require('./routes/auth');
// const logger = require("./middleware/logger");

// ========================================================================

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }/message-board?retryWrites=true`,
  { useNewUrlParser: true },
);

const app = express();

// ========================================================================
// Set up middleware

// body parser middleware
app.use(express.json());

// cors middleware
app.use(cors());

// logger middleware
// app.use(logger);

// static middleware
app.use(express.static(path.join(__dirname, 'public')));

// ========================================================================
// routing

app.use('/api/comments', commentsRouter);
app.use('/api/auth', authRouter);

// ========================================================================

const PORT = process.env.PORT || 4825;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// ========================================================================
// ========================================================================
