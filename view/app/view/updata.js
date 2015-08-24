//列表页
indexApp
	.controller('updataCtrl',['$scope', '$http', '$rootScope', '$location', 'userService', function($scope, $http, $rootScope, $location, userService){
		var id = window.location.href.split('updata/', 2)[1];
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

		$scope.getStarData = function (num) {
			$('.a-radio').find('span').removeClass('active');
			$('.a-radio').find('span').eq(num).addClass('active');
			$scope.updataForm['star'] = num;

		}

		function getInfo() {
			$http({
				method : 'POST',
				url    : '/main.php/Index/Index/getInfo/',
				data : 'id=' + id + '&username=' + $rootScope.userInfo['username'],
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
					$scope.updataForm= data;
					$('.a-radio').find('span').each(function (i) {
					if($scope.updataForm['star'] == i) {
						$(this).addClass('active');
					} 
					});
				}
			})

		}

		$scope.updataFormSub = function () {
			if($scope.updataForm['title'] == '') {
				$rootScope.error = {
					'title' : '填写名称',
					'mess'  : '对不起,请填写站点名称',
					'url'   : '/add'
				};
				$location.path('/error');
			}else if($scope.updataForm['url'] == '') {
				$rootScope.error = {
					'title' : '填写地址',
					'mess'  : '对不起,请填写站点地址',
					'url'   : '/add'
				};
				$location.path('/error');
			}else if($scope.updataForm['keywords'] == '') {
				$rootScope.error = {
					'title' : '填写关键词',
					'mess'  : '对不起,请填写站点关键词',
					'url'   : '/add'
				};
				$location.path('/error');
			}else {
				$http({
					method : 'POST',
					url    : '/main.php/Index/Index/updata/',
					data : $.param($scope.updataForm) + '&username=' + $rootScope.userInfo.username,
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
							'url'   : '/list'
						};
						$location.path('/success');
					}else {
						$rootScope.error = {
							'title' : data['title'],
							'mess'  : data['mess'],
							'url'   : '/updata/' + id
						};
						$location.path('/error');
					}
				});
			}
		}


	}]);