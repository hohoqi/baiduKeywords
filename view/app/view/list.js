//列表页
indexApp
	.controller('listCtrl',['$scope', '$http', '$rootScope', '$filter', '$location', 'userService', function($scope, $http, $rootScope, $filter, $location, userService){
		//先从注入的自定义服务中判断登录信息是否正常
		if(!$rootScope.userInfo) {
			userService.get([getlist]);
		}else {
			getlist();
		}

		//初始化背景颜色
		document.body.className = 'bg-default';
		//设置模板路由
		$scope.$location = $location;

		//退出登录
		$scope.loginOut = function() {
			userService.loginOut();
		}

		$scope.select = 0;

		//获得页数
		var pValue = sessionStorage.getItem('p');
		$scope.p = pValue ? pValue : 1;

		$scope.pageNum = 30;//初始化分页值

		function getlist() {
			$http({
				method : 'POST',
				url    : '/main.php/Index/Index/alist/',
				data : 'username=' + $rootScope.userInfo['username'],
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			//成功
			.success(function (data) {
				//顶级数据存储
				$scope.topData = data;
				//分割显示的数据存储
				$scope.infolist = [];
				//因为涉及到数据绑定,只能用这个方式来取值
				var iVal = $scope.p == 1 ? 0 : ($scope.p-1)*($scope.pageNum);
				var iLastVal = (iVal + $scope.pageNum) > $scope.topData.length ? $scope.topData.length : (iVal + $scope.pageNum);
				for(var i=iVal; i<iLastVal; i++) {
					$scope.infolist.push($scope.topData[i])
				}
				$scope.getPage(); //分页
			})

		}

		$scope.getPage = function () {

				//定义为false 为后面 true做准备
				$scope.pageShow = false;

				//设置ar 个数
				$scope.ar = Math.ceil($scope.topData.length/$scope.pageNum);
				//当ar 大于1页的时候 才出现分页
				if($scope.topData.length > $scope.pageNum) {

					//分页显示
					$scope.pageShow = true;

					//分页总长度
					$scope.pageLength = [];
					for(var i=0; i<$scope.ar; i++) {

						//如果 分页为当前页 则高亮
						if((i+1) == $scope.p) {

							var cl = 'active';
						}else {
							var cl = '';
						}

						var jsonn = {'p' : i+1, 'class' : cl}
						$scope.pageLength.push(jsonn);
					}

					//第一页,最后页
					$scope.pageFirst = '';
					$scope.pageLast = '';
					if($scope.p == 1) {
						$scope.pageFirst = 'disabled';
					}

					if($scope.p == $scope.ar) {
						$scope.pageLast = 'disabled';
					}
				
				}

			}


		$scope.delete = function (id, index) {
			//alert($scope.infolist)
			$http({
				method : 'POST',
				url    : '/main.php/Index/Index/delete/',
				data : 'username=' + $rootScope.userInfo['username'] + '&id=' + id,
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
					$scope.infolist.splice(index, 1);
				}else {
					alert('删除失败,请刷新重试');
				}
			})
		}

		$scope.pageBtn = function(n) {
			if(n == 'first') {
				if($scope.p > 1) {
					sessionStorage.setItem('p', parseInt($scope.p)-1);
				}
			}else if(n == 'last'){
				if($scope.p < $scope.ar) {
					sessionStorage.setItem('p', parseInt($scope.p)+1);
				}
			}else {
				sessionStorage.setItem('p', n);
			}

			//获得页数
			var pValue = sessionStorage.getItem('p');
			$scope.p = pValue ? pValue : 1;
			$scope.infolist= [];
			//因为涉及到数据绑定,只能用这个方式来取值
			var iVal = $scope.p == 1 ? 0 : ($scope.p-1)*($scope.pageNum);
			var iLastVal = (iVal + $scope.pageNum) > $scope.topData.length ? $scope.topData.length : (iVal + $scope.pageNum);
			for(var i=iVal; i<iLastVal; i++) {
				$scope.infolist.push($scope.topData[i])
			}

			$scope.getPage(); //分页
		}


		$scope.selectBtn = function () {
			if($scope.select == 0) {
				getlist();
			}else {
				$scope.infolist = $filter('getSelect')($scope.topData, 'star', $scope.select);
				//分页显示
				$scope.pageShow = false;
			}
		}

		$scope.searchBtn = function () {
			if($scope.search == '') {
				getlist();
			}else {
				$scope.infolist = $filter('getSelect')($scope.topData, 'title', $scope.search);
				//分页显示
				$scope.pageShow = false;
			}
		}

		$scope.repeat = function (id, $index) {
			$scope.infolist[$index]['bd_include'] = '<i class="fa fa-spinner fa-pulse fa-lg"></i>';
			$scope.infolist[$index]['weight'] = '<i class="fa fa-spinner fa-pulse fa-lg"></i>';
			$scope.infolist[$index]['rank'] = '<i class="fa fa-spinner fa-pulse fa-lg"></i>';
			$scope.infolist[$index]['up_time'] = '<i class="fa fa-spinner fa-pulse fa-lg"></i>';

			$http({
				method : 'POST',
				url    : '/main.php/Index/Index/repeat/',
				data : 'username=' + $rootScope.userInfo['username'] + '&id=' + id,
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
					$scope.infolist[$index]['bd_include'] = data['data']['bd_include'];
					$scope.infolist[$index]['weight'] = data['data']['weight'] ? data['data']['weight'] : 0;
					$scope.infolist[$index]['rank'] = data['data']['rank'];
					$scope.infolist[$index]['up_time'] = data['data']['up_time'];
				}else {
					alert(data['title']);
				}
			})
		}



		setTimeout(function () {
			$('.selectchange').find('option').eq(0).remove();
		},200);

}]);
