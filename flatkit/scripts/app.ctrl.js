/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */

(function() {
    'use strict';
    angular
      .module('app')
      .controller('AppCtrl', AppCtrl);

      AppCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', '$http'];

      function AppCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, $http) {
        $scope.isIE = isIE();
        $scope.isSmart = isSmart();
        // config
        $scope.app = {
          name: 'UP-OMPU',
          version: '1.1.0',
          // for chart colors
          color: {
            'primary':      '#0cc2aa',
            'accent':       '#a88add',
            'warn':         '#fcc100',
            'info':         '#6887ff',
            'success':      '#6cc788',
            'warning':      '#f77a99',
            'danger':       '#f44455',
            'white':        '#ffffff',
            'light':        '#f1f2f3',
            'dark':         '#2e3e4e',
            'black':        '#2a2b3c'
          },
          setting: {
            theme: {
              primary: 'primary',
              accent: 'accent',
              warn: 'warn'
            },
            folded: false,
            boxed: false,
            container: false,
            themeID: 1,
            bg: ''
          }
        };

        var setting = $scope.app.name+'-Setting';
        // save settings to local storage
        if ( angular.isDefined($localStorage[setting]) ) {
          $scope.app.setting = $localStorage[setting];
        } else {
          $localStorage[setting] = $scope.app.setting;
        }
        // watch changes
        $scope.$watch('app.setting', function(){
          $localStorage[setting] = $scope.app.setting;
        }, true);

        getParams('bg') && ($scope.app.setting.bg = getParams('bg'));

        $scope.setTheme = setTheme;
        setColor();
        
        function setTheme(theme){
          $scope.app.setting.theme = theme.theme;
          setColor();
          if(theme.url){
            $timeout(function() {
              $window.location.href = theme.url;
            }, 100, false);
          }
        };

        function setColor(){
          $scope.app.setting.color = {
            primary: getColor($scope.app.setting.theme.primary),
            accent: getColor($scope.app.setting.theme.accent),
            warn: getColor($scope.app.setting.theme.warn)
          };
        };

        function getColor(name){
          return $scope.app.color[ name ] ? $scope.app.color[ name ] : palette.find(name);
        };

        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
          // goto top
          $location.hash('content');
          $anchorScroll();
          $location.hash('');
          // hide open menu
          $('#aside').modal('hide');
          $('body').removeClass('modal-open').find('.modal-backdrop').remove();
          $('.navbar-toggleable-sm').collapse('hide');
        };

        $scope.goBack = function () {
          $window.history.back();
        };

        function isIE() {
          return !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        }

        function isSmart(){
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function getParams(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
		


      }
	  
	    function Former($scope, $http) {
			$scope.response={};
			$scope.save = function (settings, Fprofile){
			$http.post("/tshirt", settings).success(function (Fprofile) {
			$scope.response=Fprofile;    
            });
          }
        };
      }
)();