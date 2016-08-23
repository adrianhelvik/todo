const angular = require('angular');
const camelcase = require('camelcase');

angular.module('app.components', []);

const components = require('./*', { mode: 'hash' });

for (const name of Object.keys(components)) {
    if (name.startsWith('index')) {
        continue;
    }

    angular.module('app.components')
        .component(camelcase(name), components[name]);
}

module.exports = angular.module('app.components');
