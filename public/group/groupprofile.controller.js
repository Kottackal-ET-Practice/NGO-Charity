(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("GroupController", GroupController);

	function GroupController(UserService, $rootScope, $location)
	{
		var vm = this;

		console.log("GroupController");

		vm.creategroup = creategroup;

		function creategroup(user){
			console.log($rootScope.currentUser);
			UserService.groupcreate(user,$rootScope.currentUser._id, function(response){
				$rootScope.group=response;
				console.log(response);
				$location.url("/memberprofile");
			});

		}
	}
})();