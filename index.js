// ========================================================================
// ========================================================================
// imports

require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const commentsRouter = require("./routes/comments");
// const logger = require("./middleware/logger");

// ========================================================================

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
app.use(express.static(path.join(__dirname, "public")));

// ========================================================================
// routing
/*
oururl.com/api/comments
					Endpoint			Verb
Create				/				POST
Read									
	All				/				GET
	One				/:id			GET
Update				/:id			PUT/Patch
Delete				/:id			DELETE
*/
app.use("/api/comments", commentsRouter);

// ========================================================================

const PORT = process.env.PORT || 4825;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// ========================================================================
// ========================================================================
