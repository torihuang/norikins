angular.module('dogdataApp',['ngResource', 'ngRoute'])
angular.module('dogdataApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: '/partials/main',
    controller: 'mvMainController'
  })
  $routeProvider.when('/photos', {
    templateUrl: '/partials/photos',
    controller: 'mvMainController'
  })
  $routeProvider.when('/about', {
    templateUrl: '/partials/about',
    controller: 'mvMainController'
  })
  $routeProvider.when('/contact', {
    templateUrl: '/partials/contact',
    controller: 'mvMainController'
  })
})