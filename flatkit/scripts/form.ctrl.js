/**
 * @ngdoc function
 * @name form.controller:FormCtrl
 * @description
 * # FormsCtrl
 * Controller of the forms
 */
(function() {
    'use strict';
    angular
      .module('former')
      .controller('FormCtrl', AppCtrl);

      AppCtrl.$inject  = ['$scope', '$http'];

	  function FormCtrl($scope, $http) {
		$scope.response={};
		console.log(123);
        $scope.save = function (settings, fprofile){
            $http.post("/tshirt", settings).success(function (fprofile) {
            $scope.response=fprofile;
			
            })
        };
      }
})();