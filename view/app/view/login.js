indexApp
	.controller('loginCtrl',['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location){
		//实例化加密类
		$scope.encrypt = new Base64();
		//初始化背景颜色
		document.body.className = 'bg-primary';
		//初始化用户名和密码
		$scope.username = '';
		$scope.password = '';
		//登录事件
		$scope.setLogin = function() {
			//检测账号 和密码为空
			if($scope.username == '' || $scope.password == '') {
				$rootScope.error = {
					'title' : '登录失败',
					'mess'  : '账号或密码不能为空',
					'url'   : '/login'
				};
				$location.path('/error');	
			//否则 发送登录请求	
			}else {
				$http({
					method : 'POST',
					url    : '/main.php/Index/Login/index/',
					data : 'username=' + $scope.username + '&password=' + $scope.password,
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				//成功
				.success(function (data) {
					//判断 登录状态是否为1
					if(data['status'] == 1) {
						//记录用户信息
						$rootScope.userInfo = {
							'username' : $scope.encrypt.encode(data['name'] + $scope.encrypt.decode(data['round'])),
							'status'  : 1
						}
						$location.path('/list');
					//登录失败 加载 信息提示页面
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
	}]);