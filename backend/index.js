const express = require('express');
const mongoose = require('mongoose');
const resource = require('resource-pebble');
const bodyParser = require('body-parser');
const {Schema} = mongoose;
const cors = require('cors');

// Misc config.
const config = {
    db: {
        port: 3772,
        path: 'mongodb://localhost'
    },
    port: 5777
};

mongoose.Promise = Promise;

// Server setup
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Models
const Todo = mongoose.model('Todo', new Schema({
    due: {type: Date, required: true},
    description: {type: String, required: true}
}));

// Routes
app.use(resource(Todo));

// Connect
const dbUrl = config.db.path + ':' + config.db.port;
console.log('Starting mongoose on ' + dbUrl);
mongoose.connect(dbUrl);
app.listen(config.port, err => {
    if (err) {
        throw err;
    }

    console.log('App started on ' + config.port);
});
