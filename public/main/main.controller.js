(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("MainController", MainController);

	function MainController(UserService, $location, $rootScope)
	{
		var vm = this;
		vm.loggout = loggout;

		function loggout()
		{
			UserService.logoutUser(function(response){
				console.log($rootScope.currentUser);
				$rootScope.currentUser = null;
				
				$location.url("/home");
			});
			
		}
	}
})();