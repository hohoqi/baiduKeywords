//定义模型,依赖注入
var indexApp = angular
	.module('app',[
		'ngAnimate',
		'ngRoute'
	])

//配置路由
indexApp
	.config(function ($routeProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: 'view/list.html',
	        controller: 'listCtrl'
	      })
	      .when('/add', {
	        templateUrl: 'view/add.html',
	        controller: 'addCtrl'
	      })
	      .when('/login', {
	        templateUrl: 'view/login.html',
	        controller: 'loginCtrl'
	      })
	      .when('/success', {
	        templateUrl: 'view/success.html',
	        controller: 'successCtrl'
	      })
	      .when('/error', {
	        templateUrl: 'view/error.html',
	        controller: 'errorCtrl'
	      })
	      .otherwise({
	        redirectTo: '/'
	      });
	  });

//注入服务
//获取用户登录信息服务
indexApp.service('userService', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {
	var sEncrypt = new Base64();
	var userInfo = {
		get : function () {
			$http({
				method : 'POST',
				url    : '/main.php/Index/login/getUserStatus/',
				data : '',
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			//成功
			.success(function (data) {
				if(data['status'] == 1) {
					//记录用户信息
					$rootScope.userInfo = {
						'username' : sEncrypt.encode(data['name'] + sEncrypt.decode(data['round'])),
						'status'  : 1
					}
				}else {
					$rootScope.error = {
						'title' : data['title'],
						'mess'  : data['mess'],
						'url'   : '/login'
					};
					$location.path('/error');
				}
			});
		}
	}
	return userInfo;
}]);
