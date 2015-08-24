//列表页
indexApp
	.controller('listCtrl',['$scope', '$http', '$rootScope', '$location', 'userService', function($scope, $http, $rootScope, $location, userService){
		//先从注入的自定义服务中判断登录信息是否正常
		if(!$rootScope.userInfo) {
			userService.get();
		}

		/*$http({
			method : 'POST',
			url    : '/main.php/Index/Index/list/',
			data : '',
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		//成功
		.success(function (data) {*/
			var date = {'data' : [{'title' : '测试站点', 'url' : 'www.baidu.com', 'bd_include' : 221, 'weight' : 21, 'trans' : 102}, {'title' : '测试站点222', 'url' : 'www.baidu2222.com', 'bd_include' : 221, 'weight' : 21, 'trans' : 102}]}
			$scope.infolist= date.data;
		//}
		

}]);
