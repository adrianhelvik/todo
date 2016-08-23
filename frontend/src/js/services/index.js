var angular = require('angular');
var pascalCase = require('pascal-case');

module.exports = angular.module('app.services', []);

var services = require('./*', { mode: 'hash' });

for (const name of Object.keys(services)) {
    if (name.startsWith('index')) {
        continue;
    }

    console.log(name);

    angular.module('app.services')
        .service(pascalCase(name), services[name]);
}
