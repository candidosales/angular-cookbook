(function (angular) {

  var app = angular.module("admin", ["ui.router", "ui.bootstrap"]),
  PATH = "/";

  app.controller("AdminController", ["$scope", "$http", "$state", "$interval", function ($scope, $http, $state, $interval) {
  }]);

  app.controller("AdminPainelController", ["$scope", "$http", "$state", "$interval", function ($scope, $http, $state, $interval) {
  }]);

  app.controller("AdminCap1Controller", ["$scope", "$http", "$state", "$interval", function ($scope, $http, $state, $interval) {

        function calculateRotation() {
          var now = new Date();

          $scope.hourRotation = 360 * now.getHours() / 12;
          $scope.minuteRotation = 360 * now.getMinutes() / 60;
          $scope.secondRotation = 360 * now.getSeconds() / 60;
        }

        $interval(calculateRotation, 1000);
        calculateRotation();
  }]);

  app.controller("AdminCap2Controller", ["$scope", "$http", "$state", function ($scope, $http, $state) {
    $scope.current = new Date();

    console.log($scope.current.toString());
  }]);

  app.controller("AdminCap5Controller", ["$scope", function ($scope) {
    $scope.tasks = ['Tidy up', 'Was the dishes'];
    $scope.removeTask = function(index) {
      $scope.tasks.splice(index, 1);
    };
  }]);

  app.controller("AdminCap6Controller", ["$scope", function ($scope) {  }]);

  app.controller("AdminCap7Controller", ["$scope", function ($scope) {  }]);

  app.controller("AdminCap9Controller", ["$scope", function ($scope) {
    $scope.personId = 2;
  }]);

  app.directive("dateselect", function () {
    return {
      restrict: "E",
      template:
        "<select ng-model='date.month' " +
          "ng-options='month for month in months'></select>" +
          "<select ng-model='date.day' " +
          "ng-options='day for day in days'></select>" +
          "<select ng-model='date.year' " +
          "ng-options='year for year in years'></select>",
      scope : {
        model: "="
      },
      controller:  function($scope) {
        var i;
        $scope.date = {};

        $scope.days = [];
        for (i = 1; i <= 31; i++) { $scope.days.push(i); }

        $scope.months = [];
        for (i = 1; i <= 12; i++) { $scope.months.push(i); }

        $scope.years = [];
        for (i = 1980; i <= (new Date().getFullYear()); i++) {
          $scope.years.push(i);
        }

        $scope.$watch("model", function(newDate) {
            $scope.date.month = newDate.getMonth() + 1;
            $scope.date.day = newDate.getDate();
            $scope.date.year = newDate.getFullYear();
        }, true);

        $scope.$watch("date", function(newDate) {
          $scope.model.setDate(newDate.day);
          $scope.model.setMonth(newDate.month - 1);
          $scope.model.setFullYear(newDate.year);
          }, true);
        }
    };
  });

  app.directive('confirmedClick', function ($parse, $q, $compile, $rootScope) {
    var box = '<div class="box"><div>Really?</div></div><button ng-click="close($event, true)">Ok</button>' +
                    '<button ng-click="close($event)">Cancel</button></div>';
    return {
      link: function(scope, element, attrs) {
        var fn = $parse(attrs.confirmedClick);
        console.log('fn', fn);
        element.on('click', function() {
          var boxScope = $rootScope.$new(),
                boxElement = $compile(box)(boxScope);

                element.attr('disabled', 'disabled');
                element.append(boxElement);

                boxScope.close = function(event, execute) {
                  event.stopPropagation();
                  element.removeAttr('disabled');
                  boxElement.remove();
                  if(execute) {
                    console.log(event);
                    fn( scope, {$event: event});
                  }
                };
        });
      }
    };
  });

  app.directive("digitalClock", function($interval) {
    return {
      restrict: 'E',
      scope: { },
      template: '<div ng-bind=" now | date: \'HH:mm:ss\'"></div>',
      link: function(scope) {
        scope.now = new Date();
        var clockTimer = $interval(function() {
          scope.now = new Date();
        }, 1000);

        scope.$on('$destroy', function() {
          $interval.cancel(clockTimer);
        });
      }
    };
  });

  app.factory('People', function($http) {
    return {
      getList: function() {
        try {
            return $http.get('person.json');
        } catch (e) {
          console.log('error', e);
        } finally {

        }
      }
    };
  });

  app.directive('dynamicSelect', function($injector) {
    return {
      restrict : 'E',
      scope: {
        model: '=',
        resourceId: '@',
        resourceLabel: '@'
      },
      template: '<select ng-model="model" ng-options="item[resourceId] ' +
        'as item[resourceLabel] for item in items" />',
      link: function(scope, element, attrs) {
        var temp = attrs.resource.split('.');
        var params = { name: temp[0], fn: temp[1] };

        var service = $injector.get(params.name);

        service[params.fn]().then(function(serviceResponse) {
          scope.items = serviceResponse.data;
        });
      }
    };
  });

  app.directive("waitingForRequest", function($http) {
    var pedingRequests = function() {
      return $http.pedingRequests.length > 0;
    };

    return {
      restric: 'E',
      scope: {},
      template: '<div ng-show="waiting"> Waiting for request to finish... </div>',
      controller: function($scope) {
        $scope.$watch(pendingRequests, function(value) {
          console.log('Pending Requests: '+ $http.pendingRequests.length);
          $scope.waiting = true ;
        });
      }
    }
  });
  // ROUTER
  app.config(["$compileProvider", "$httpProvider", "$urlRouterProvider", "$stateProvider", function ($compileProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
    // Do not use debug stuff
    $compileProvider.debugInfoEnabled(true);

    // Make sure POSTs have the right content-type
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

    // A "404" will go to /
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("admin", {
      url: "/",
      abstract: true,
      templateUrl: PATH+"admin.html",
      controller:  "AdminController",
    }).state("admin.painel", {
      url: "painel",
      templateUrl: PATH+"adminPainel.html",
      controller:  "AdminPainelController"
    }).state("admin.cap1", {
      url: "cap1",
      templateUrl: PATH+"adminCap1.html",
      controller:  "AdminCap1Controller"
    }).state("admin.cap2", {
      url: "cap2",
      templateUrl: PATH+"adminCap2.html",
      controller:  "AdminCap2Controller"
    }).state("admin.cap5", {
      url: "cap5",
      templateUrl: PATH+"adminCap5.html",
      controller:  "AdminCap5Controller"
    }).state("admin.cap6", {
      url: "cap6",
      templateUrl: PATH+"adminCap6.html",
      controller:  "AdminCap6Controller"
    }).state("admin.cap7", {
      url: "cap7",
      templateUrl: PATH+"adminCap7.html",
      controller:  "AdminCap7Controller"
    }).state("admin.cap9", {
      url: "cap9",
      templateUrl: PATH+"adminCap9.html",
      controller:  "AdminCap9Controller"
    });
  }]);

})(angular);
