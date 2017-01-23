(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ManagegroupController", ManagegroupController);

	function ManagegroupController(UserService, $rootScope, $scope)
	{
		var vm = this;


		vm.managegroup = managegroup;
		vm.gdonate = gdonate;
		var user=$rootScope.currentUser;
		
		function managegroup(){
				UserService.groupmanage(user._id,function(response){
				$scope.projectlist = response;
			});

	}
	function gdonate(gid){
		$rootScope.grpid=gid;
		window.location.href='#groupdonate';
		console.log("ManagegroupController");
		console.log(gid);
	}

	}
})();