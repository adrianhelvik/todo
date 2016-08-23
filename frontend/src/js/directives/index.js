const angular = require('angular');
const camelcase = require('camelcase');

module.exports = angular.module('app.directives', []);

const directives = require('./*', { mode: 'hash' });

for (const name of Object.keys(directives)) {
    if (name.startsWith('index')) {
        continue;
    }

    angular.module('app.directives')
        .directive(camelcase(name), directives[name]);
}
