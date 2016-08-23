var angular = require('angular');
var camelcase = require('camelcase');

module.exports = angular.module('app.filters', []);

var filters = require('./*', { mode: 'hash' });

for (let name of Object.keys(filters)) {
    if (name.startsWith('index'))
        continue;
    angular.module('app.filters')
        .filter(camelcase(name), filters[name]);
}
