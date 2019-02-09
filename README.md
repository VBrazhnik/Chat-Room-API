# Chat Room API

Movie Library RESTful API was developed using MongoDB, Express.js and Node.js.

## Task

### Description

Unauthenticated users can post messages in chat so others can read them.
Messages need to be saved to the database.

### Basic requirements

* Koa/Express, MongoDB
* The message must contain author (unauthenticated user) email and text, create date and update date
* Email validation (regex to check if that is a real email)
* Message validation (regex to check if a message is not empty string, and length < 100)

### API methods

* `GET` method for getting all messages with pagination by 10 messages per request (e.g. `/api/messages/list/0` will return first 10 messages)

* `GET` method for getting single message by unique identifier (e.g. `/api/messages/single/59f7303c2f60e5d7e6167dd1`)

* `POST` method for creating a new message (body accepts email and text)

## Documentation

### Installation

Clone repository and install node modules:

```
$ git clone <repository url> <folder name>
$ cd <folder name>
$ npm i
```

### Configuration & Execution

You can use environment variables to specify server port and MongoDB database URI:

```
$ PORT=<port> DB_URI=<database URI> npm start
```

If these environment variables were not set, default values will be used. Default values are specified in `config.js` file.

### Message

#### Structure

Field|Data Type|Required|Default|Restrictions|Note
:-----|:-----|:-----|:-----|:-----|:-----
`email`|String|Required|—|Value must be a valid email address|Value will be trimmed and converted to lowercase
`text`|String|Required|—|Length must be less than 100 characters|Value will be trimmed
`create_date`|Date|Not Required|Current date|—|—
`update_date`|Date|Not Required|Current date|—|—

#### Schema

```
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
```

**Note:** Regular expression to validate email [was recommended by W3C](https://www.w3.org/TR/html5/forms.html#valid-e-mail-address).

### RESTful API

URL|HTTP Method|Body of Request|Response
:-----|:-----|:-----|:-----
`/api/messages/list/:page`|`GET`|—|All messages from the given page
`/api/messages/single/:id`|`GET`|—|Message with the given ID
`/api/messages/`|`POST`|JSON|Created message
