(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("HistoryController", HistoryController);

	function HistoryController(UserService, $rootScope, $scope)
	{
		var vm = this;
		console.log("HistoryContoller..........");

		vm.viewHistory=viewHistory;
		function viewHistory(){
		
				console.log("HistoryContoller..........");
				console.log($rootScope.currentUser);
				UserService.vieww($rootScope.currentUser._id,function(response){
					$scope.projectlist = response;
					console.log("Response.....");
					
					for (var i = 0; i < response.length; i++) {
						$scope.projectlist[i].c=((response[i].donation/response[i].total)*100).toFixed(0);
						console.log($rootScope.c);
						$scope.projectlist[i].d=(response[i].donation/response[i].amount);
					}
					console.log($scope.projectlist);
			});

		}
	}
})();

