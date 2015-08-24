//成功页面跳转
indexApp
	.controller('successCtrl',['$scope', '$rootScope', '$interval', '$location', function($scope, $rootScope, $interval, $location){
		$scope.timer = 3;
    var sucTimer = $interval(function() {
			if($scope.timer == 0) {
				$interval.cancel(sucTimer);
				$location.path($rootScope['success']['url']);
			}else {
				$scope.timer--;
			}
		}, 1000);
		document.body.className = 'success-body';

		$scope.back = function () {
			$interval.cancel(sucTimer);
			$location.path($rootScope['error']['url']);
		}
	}]);

//失败页面跳转
indexApp
	.controller('errorCtrl',['$scope', '$rootScope', '$interval', '$location', function($scope, $rootScope, $interval, $location){
		$scope.timer = 3;
		var errTimer = $interval(function() {
			if($scope.timer == 0) {
				$interval.cancel(errTimer);
				$location.path($rootScope['error']['url']);
			}else {
				$scope.timer--;
			}
		}, 1000);
		document.body.className = 'error-body';

		$scope.back = function () {
			$interval.cancel(errTimer);
			$location.path($rootScope['error']['url']);
		}
	}])