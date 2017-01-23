(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("VotinghistoryController", VotinghistoryController);

	function VotinghistoryController(UserService, $rootScope, $scope)
	{
		var vm = this;
		console.log("VotinghistoryController..........");

		vm.viewHistory=viewHistory;
		function viewHistory(user){
			console.log(user);
			$rootScope.id=user;
			console.log($rootScope.currentUser);
			UserService.voteHistory(user,$rootScope.currentUser._id,function(response){
				$scope.projectlist = response;
			});

		}
	}
})();

