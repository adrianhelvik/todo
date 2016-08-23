var angular = require('angular');
var pascalCase = require('pascal-case');

module.exports = angular.module('app.resources', []);

var resources = require('./*', { mode: 'hash' });

for (let name of Object.keys(resources)) {
    if (name.startsWith('index'))
        continue;
    angular.module('app.resources')
        .service(pascalCase(name), resources[name]);
}
