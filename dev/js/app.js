(function (angular) {

  var app = angular.module("admin", ["ui.router", "ui.bootstrap"]),
  PATH = "/";

  app.controller("AdminController", ["$scope", "$http", "$state", function ($scope, $http, $state) {
    $state.transitionTo("admin.painel");
  }]);

  app.controller("AdminPainelController", ["$scope", "$http", "$state", function ($scope, $http, $state) {

  }]);

  app.controller("AdminArvoreMotivosController", ["$scope", "$http", "$state", function ($scope, $http, $state) {

  }]);

  app.controller("AdminImportacaoDadosController", ["$scope", "$http", "$state", function ($scope, $http, $state) {

  }]);

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
      // resolve : {
      // 	usuarioLogado: ["$http", "$q", function($http, $q) {
      // 		return $q(function (resolve, reject) {
      // 			$http.get("/dados/api/me").success(function (data) {
      // 				resolve(data);
      // 			}).error(function (data) {
      // 				reject(data);
      // 			});
      // 			});
      // 		}]
      // 	}
    }).state("admin.painel", {
      url: "painel",
      templateUrl: PATH+"adminPainel.html",
      controller:  "AdminPainelController"
    }).state("admin.arvoreMotivos", {
      url: "arvoreMotivos",
      templateUrl: PATH+"adminArvoreMotivos.html",
      controller:  "AdminArvoreMotivosController"
    }).state("admin.importacaoDados", {
      url: "importacaoDados",
      templateUrl: PATH+"adminImportacaoDados.html",
      controller:  "AdminImportacaoDadosController"
    });
  }]);

})(angular);
