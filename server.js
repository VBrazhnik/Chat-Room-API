const config = require('./config');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const messages = require('./routes/messages');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.database.uri, { useNewUrlParser: true })
	.then(() => console.log('Successfully connected to MongoDB database'))
	.catch((error) => console.log(`Cannot connect to MongoDB: ${error}`));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

if (process.env.NODE_ENV !== 'production')
	app.use(morgan('tiny'));

app.use('/api/messages/', messages);

app.listen(config.server.port, () => console.log(`Server is running...`));
