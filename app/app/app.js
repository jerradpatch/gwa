(function () {
    'use strict';

    var angular = require('angular');
    require('angular-route');

    angular.module('app', ['ngRoute','todoPartials'])
        .config(function ($routeProvider) {
            'use strict';

            var routeConfig = {
                controller: 'TodoCtrl',
                templateUrl: '/controllers/todomvc-index.html',
            };

            $routeProvider
                .when('/', routeConfig)
                .when('/:status', routeConfig)
                .otherwise({
                    redirectTo: '/'
                });
        });
})();