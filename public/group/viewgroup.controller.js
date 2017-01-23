(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ViewgroupController", ViewgroupController);

	function ViewgroupController(UserService, $rootScope, $scope)
	{
		var vm = this;


		vm.viewgroup = viewgroup;
		var user=$rootScope.currentUser;
		
		function viewgroup(){
				UserService.groupview(user._id,function(response){
				$scope.projectlist = response;
			});

	}

	}
})();