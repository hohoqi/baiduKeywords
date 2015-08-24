//添加
indexApp
	.controller('addCtrl',['$scope', '$http', '$rootScope', '$location', 'userService', function($scope, $http, $rootScope, $location, userService){
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

		//双向数据绑定
		$scope.addForm = {
			'title' : '',
			'url' : '',
			'keywords' : '',
			'star' : 0,
			'tips' : ''
		}

		$scope.getStarData = function (num) {
			$('.a-radio').find('span').removeClass('active');
			$('.a-radio').find('span').eq(num).addClass('active');
			$scope.addForm['star'] = num;

		}

		$scope.addFormSub = function () {
			if($scope.addForm['title'] == '') {
				$rootScope.error = {
					'title' : '填写名称',
					'mess'  : '对不起,请填写站点名称',
					'url'   : '/add'
				};
				$location.path('/error');
			}else if($scope.addForm['url'] == '') {
				$rootScope.error = {
					'title' : '填写地址',
					'mess'  : '对不起,请填写站点地址',
					'url'   : '/add'
				};
				$location.path('/error');
			}else if($scope.addForm['keywords'] == '') {
				$rootScope.error = {
					'title' : '填写关键词',
					'mess'  : '对不起,请填写站点关键词',
					'url'   : '/add'
				};
				$location.path('/error');
			}else {
				$http({
					method : 'POST',
					url    : '/main.php/Index/Index/add/',
					data : $.param($scope.addForm) + '&username=' + $rootScope.userInfo.username,
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
							'url'   : '/add'
						};
						$location.path('/error');
					}
				});
			}
		}


}]);