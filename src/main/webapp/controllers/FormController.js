formApp.controller('FormController', function FormController($scope, $http) {
	$scope.result = '';
	
	$scope.submit = function() {
		var params = {
				'name' : $scope.user.name,
				'email' : $scope.user.email,
				'password' : $scope.user.password,
				'age' : $scope.user.age
			};
		var request = {
				method: 'post',
				url: 'RegisterServlet',
				headers: {
					   'Content-Type': 'application/x-www-form-urlencoded'
					 },
			    transformRequest: function(obj) {
			        var str = [];
			        for(var p in obj)
			        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        return str.join("&");
			    },
				data: params
		};

		$http(request).success(function(data) {
			$scope.result = data;
		}).error(function(data) {
			$scope.result = 'an error has occoured';
		});
	}
});
