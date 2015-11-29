(function () {

    'use strict';

    // app.module.js
    angular.module('app', []);

    // app.controller.js
    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController() {

    }

    // normalize.filter.js
    angular
        .module('app')
        .filter('normalize', normalize);

    function normalize() {
        return function (input) {
            var output = '';
            if (!input) {
                return output;
            }
            output = input.toLowerCase();
            output = replaceChars(output);

            return output;

            ////////////

            function replaceChars(string) {
                string = string.replace(/%/g, 'percent');
                string = string.replace(/#/g, 'number');
                string = string.replace(/&/g, 'and');
                string = string.replace(/\$/g, 'usd');
                string = string.replace(/-/g, '_');
                string = string.replace(/\./g, '_');
                string = string.replace(/ /g, '_');
                return string.replace(/[^\w_]/g, '');
            }
        };
    }

})();
