//添加
indexApp
	.controller('settingCtrl',['$scope', '$http', '$rootScope', '$location', 'userService', function($scope, $http, $rootScope, $location, userService){
		//先从注入的自定义服务中判断登录信息是否正常
		if(!$rootScope.userInfo) {
			userService.get([getInfo]);
		}else {
			getInfo();
		}

		//初始化背景颜色
		document.body.className = 'bg-default';

		//设置模板路由
		$scope.$location = $location;
		
		//退出登录
		$scope.loginOut = function() {
			userService.loginOut();
		}

		function getInfo() {
			$http({
				method : 'POST',
				url    : '/main.php/Index/Login/getUser/',
				data : '&username=' + $rootScope.userInfo['username'],
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			//成功
			.success(function (data) {
				if(data['status'] == 50099) {
					$rootScope.error = {
						'title' : data['title'],
						'mess'  : data['mess'],
						'url'   : '/login'
					};
					$location.path('/error');	
				}else {
					$scope.setting= data;
				}
			})

		}

		$scope.addFormSub = function () {
			if($scope.setting['username'] == '') {
				$rootScope.error = {
					'title' : '填写用户名',
					'mess'  : '对不起,请填写用户名',
					'url'   : '/setting'
				};
				$location.path('/error');
			}else if($scope.setting['password'] == '') {
				$rootScope.error = {
					'title' : '填写密码',
					'mess'  : '对不起,请填写密码',
					'url'   : '/setting'
				};
				$location.path('/error');
			}else {
				$http({
					method : 'POST',
					url    : '/main.php/Index/Login/updata/',
					data : $.param($scope.setting) + '&username=' + $rootScope.userInfo.username,
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				//成功
				.success(function (data) {
					if(data['status'] == 50099) {
						$rootScope.error = {
							'title' : data['title'],
							'mess'  : data['mess'],
							'url'   : '/login'
						};
						$location.path('/error');	
					}else if(data['status'] == 1) {
						$rootScope.success = {
							'title' : data['title'],
							'mess'  : data['mess'],
							'url'   : '/login'
						};
						$location.path('/success');
					}else {
						$rootScope.error = {
							'title' : data['title'],
							'mess'  : data['mess'],
							'url'   : '/setting'
						};
						$location.path('/error');
					}
				});
			}
		}


}]);