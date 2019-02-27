const moment = require("moment");

// Date.now() = moment()

const logger = (request, response, next) => {
	console.log(`${request.url} was requested at ${moment()}`);
	next();
};

module.exports = logger;
