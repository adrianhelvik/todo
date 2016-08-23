angular.module('app').config(($stateProvider, $urlRouterProvider, $locationProvider) => {

    $locationProvider
        .html5Mode(true);

    $urlRouterProvider
        .otherwise('/');

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'HomeController',
            controllerAs: '$ctrl'
        })

        .state('edit', {
            url: '/edit/id',
            templateUrl: 'edit.html',
            controller: 'EditController',
            controllerAs: '$ctrl'
        })

        ;

});
