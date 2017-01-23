(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("GroupeditController", GroupeditController);

	function GroupeditController(UserService, $rootScope, $scope)
	{
		var vm = this;


		vm.managegroup = managegroup;
		//vm.profileview = profileview;
		var user=$rootScope.currentUser;
		
		function managegroup(){
				UserService.groupmanage(user._id,function(response){
				$scope.projectlist = response;
			});

	}
	// function profileview(gid){
	// 	UserService.updateProfile(gid, function(response){
	// 		$scope.project = response;
	// 			console.log(response);
	// 		});
	// 		alert("Profile Updated..");
	// 		$location.url("/home");
	// }

	}
})();