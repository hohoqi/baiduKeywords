//定义模型,依赖注入
var indexApp = angular
	.module('app',[
		'ngAnimate',
		'ngRoute',
		'ngSanitize'
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
	      .when('/updata/:num', {
	        templateUrl: 'view/updata.html',
	        controller: 'updataCtrl'
	      })
	      .when('/login', {
	        templateUrl: 'view/login.html',
	        controller: 'loginCtrl'
	      })
	      .when('/all', {
	        templateUrl: 'view/all.html',
	        controller: 'allCtrl'
	      })
	      .when('/setting', {
	        templateUrl: 'view/setting.html',
	        controller: 'settingCtrl'
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
		get : function (tu) {
			$http({
				method : 'POST',
				url    : '/main.php/Index/Login/getUserStatus/',
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
					
					if(tu) {
						for(var i=0; i< tu.length; i++) {
							tu[i]();
						}
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
		},
		loginOut : function () {
			$http({
				method : 'POST',
				url    : '/main.php/Index/login/out/',
				data : '',
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			//成功
			.success(function (data) {
				if(data['status'] == 1) {
					$rootScope.userInfo = '';
					window.location.reload();
				}
			});
		}
	}
	return userInfo;
}]);

//自定义过滤器
indexApp.filter('getSelect', function () {
	return function (data, value, model) {
		var array = [];
		var re = new RegExp(model);
		for(var i=0;i<data.length;i++){
			if(re.test(data[i][value])) {
                array.push(data[i]);
            }
        }
        return array;
	}
});