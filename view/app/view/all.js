indexApp
	.controller('allCtrl',['$scope', '$http', '$rootScope', '$filter', '$location', 'userService', '$interval', function($scope, $http, $rootScope, $filter, $location, userService, $interval){
		//先从注入的自定义服务中判断登录信息是否正常
		if(!$rootScope.userInfo) {
			userService.get();
		}

		//初始化背景颜色
		document.body.className = 'bg-default';
		//设置模板路由
		$scope.$location = $location;

		//退出登录
		$scope.loginOut = function() {
			userService.loginOut();
		}
		$scope.progressShow = false;
		$scope.getAll = function () {
			$http({
				method : 'POST',
				url    : '/main.php/Index/Index/allSite/',
				data : 'username=' + $rootScope.userInfo['username'],
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
					$scope.progress = '0%';
					$scope.progressName = '0%';
					$scope.siteNum = 0;
					$scope.scale = 1/data.data.length;

					//执行数据更新
					$scope.getProgress(data['data']);
					$scope.progressShow = true;
				}else {
					alert('获取信息失败,请重试');
				}
			})
		}

		$scope.getProgress = function (info) {
			$http({
				method : 'POST',
				url    : '/main.php/Index/Index/repeat/',
				data : 'username=' + $rootScope.userInfo['username'] + '&id=' + info[$scope.siteNum]['id'],
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
					$scope.siteNum ++;
					$scope.progress = ($scope.siteNum * (1/info.length))*100 + '%';

					if($scope.progress == '100%') {
						$scope.progressName = '更新完成';
					}else {
						$scope.progressName = $scope.progress;
					}
					if(info.length >= $scope.siteNum + 1) {
						$scope.getProgress(info);
					}
				}
			})
		}
	}]);