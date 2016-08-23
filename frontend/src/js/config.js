angular.module('app').config(() => {

    // Provider config...

});

angular.module('app').constant('apiUrl', 'http://localhost:5777');

angular.module('app').run(($rootScope) => {
    console.log('App loaded!');

    // Run config...
    $rootScope.title = '';

});
