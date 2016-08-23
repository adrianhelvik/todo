// Define global variables
// -----------------------

global.jQuery = global.$ = require('jquery');
global.angular = require('angular');
global.APP_ENV = require('../../env');

// Bootstrap app
// -------------

require('./app');
require('./routes');
require('./config');
