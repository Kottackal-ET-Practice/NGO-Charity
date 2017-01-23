(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("LoginController", LoginController);

	function LoginController(UserService, $location, $rootScope)
	{
		var vm = this;
		vm.login = login;

		function login(user)
		{

			UserService.loginUser(user, function(response)
			{
				if(response==null)
				{
					vm.message = "User not found";

				}
				else
				{
					console.log("Hai");
					$rootScope.currentUser = response;
					console.log($rootScope.currentUser.role);
					if($rootScope.currentUser.role==="user")
					{
						$location.url("/singlehome");
						//console.log($rootScope.currentUser.role);
					}
					else
						$location.url("/home");
				}
			});
		}
	}
})();