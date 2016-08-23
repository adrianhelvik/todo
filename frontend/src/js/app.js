var angular = require('angular');

var app = angular.module('app', [

    // Third party

    require('angular-ui-router'),

    // Project

    require('./components').name,
    require('./directives').name,
    require('./resources').name,
    require('./filters').name,
    require('./controllers').name,
    require('./services').name
]);

module.exports = app;
