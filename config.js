const config = {};

config.server = {};
config.server.port = process.env.PORT || 8080;

config.database = {};
config.database.uri = process.env.DB_URI || 'mongodb://localhost/chat-room';

module.exports = config;
