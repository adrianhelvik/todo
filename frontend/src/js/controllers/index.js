var angular = require('angular');
var pascalCase = require('pascal-case');

angular.module('app.controllers', []);

var controllers = require('./*', { mode: 'hash' });

for (let name of Object.keys(controllers)) {
    if (name.startsWith('index'))
        continue;
    angular.module('app.controllers')
        .controller(pascalCase(name), controllers[name]);
}

module.exports = angular.module('app.controllers');
