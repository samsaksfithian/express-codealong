// ========================================================================
// ========================================================================
// Imports

const express = require("express");
const shortid = require("shortid");
const moment = require("moment");
const commentData = require("../data");

// ========================================================================

const router = express.Router();

// ========================================================================
// ========================================================================
// READ

// get all comments
router.get("/", (request, response) => {
	response.json(commentData);
}); // Read All

// ========================================================================

// get a single comment by id
router.get(`/:id`, (request, response) => {
	const myComment = commentData.find(
		comment => comment.id === parseInt(request.params.id, 10),
	);
	if (!myComment) {
		response.status(404).json({ msg: "Invalid ID" });
	}
	response.status(200).json(myComment);
}); // Read One

// ========================================================================
// ========================================================================
// CREATE

// create a comment
router.post("/", (request, response) => {
	if (!request.body.text) {
		// BONUS: if request has no body text (or text is empty) send proper error code
		response
			.status(400)
			.json({ msg: "Invalid syntax: please provide comment text" });
	} // json function ends the call and kicks you out
	// create a new comment with the text
	// timestamp: moment()
	// id should be shortid
	const newComment = {
		text: request.body.text,
		id: shortid.generate(),
		timestamp: moment().format(),
	};
	// add it to commentData
	commentData.push(newComment);
	// return all the comments (make sure new comment is included)
	response
		.status(201)
		.json({ msg: "Comment successfully added", comments: commentData });
});

// ========================================================================
// ========================================================================
// UPDATE

router.patch("/:id", (request, response) => {
	const myComment = commentData.find(
		comment => comment.id === parseInt(request.params.id, 10),
	);
	if (!myComment) {
		response.status(404).json({ msg: "Invalid ID" });
	} else if (!request.body.text) {
		response
			.status(400)
			.json({ msg: "Invalid syntax: please provide comment text" });
	}
	myComment.text = request.body.text;
	myComment.timestamp = moment().format();
	response.status(200).json({
		msg: "Comment text and timestamp successfully updated",
		comment: commentData,
	});
});

// ========================================================================
// ========================================================================
// DELETE

router.delete("/:id", (request, response) => {
	const myCommentIndex = commentData.findIndex(
		comment => comment.id === parseInt(request.params.id, 10),
	);
	if (myCommentIndex < 0) {
		response.status(404).json({ msg: "Invalid ID" });
	}
	commentData.splice(myCommentIndex, 1);
	response
		.status(200)
		.json({ msg: "Comment successfully removed", comments: commentData });
});

// ========================================================================
// ========================================================================

module.exports = router;

// ========================================================================
// ========================================================================
