const express = require('express');
const Message = require('../model/message');

const router = express.Router();

router.get('/list/:page', async (request, response) => {
	try {
		let page = Number(request.params.page);

		if (!Number.isSafeInteger(page) || page < 0)
			return (response.status(400).send('Invalid page number'));

		response.json(await Message.find().skip(page * 10).limit(10));
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.get('/single/:id', async (request, response) => {
	try {
		const message = await Message.findOne({ _id: request.params.id });

		if (!message)
			return (response.status(404).send('Message with given ID was not found'));

		response.json(message);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.post('/', async (request, response) => {
	try {
		let message = new Message({
			email: request.body.email,
			text: request.body.text
		});

		response.json(await message.save());
	} catch (error) {
		if (error.name === 'ValidationError')
			response.status(400).send(error.message);
		else
			response.status(500).send(error.message);
	}
});

module.exports = router;
