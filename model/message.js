const mongoose = require('mongoose');

const Message = new mongoose.model('Message', new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		match: [/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Invalid email address']
	},
	text: {
		type: String,
		required: true,
		trim: true,
		match: [/^.{1,99}$/, 'Length must be less than 100 characters']
	},
	create_date: {
		type: Date,
		default: Date.now
	},
	update_date: {
		type: Date,
		default: Date.now
	}
}));

module.exports = Message;
