'use strict';

/**
 * @ngdoc directive
 * @name angularDashboardApp.directive:loadingmessage
 * @description
 * # loadingmessage
 */
angular.module('angularDashboardApp')
  .directive('loadingmessage', function ($timeout) {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the loadingmessage directive');
        $(window).load(function(){
        	$timeout(function(){
        		element.addClass("animated flipOutX");
        	},2000)
        });
      }
    };
  });
