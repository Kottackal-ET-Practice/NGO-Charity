(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("RegisterController", RegisterController);

	function RegisterController(UserService, $location)
	{
		var vm = this;
		vm.register=register;
		
		function register(user){
			UserService.createUser(user, function(response){
				console.log(response);
				 if(response==null)
				 {
					//vm.message = "Registration failed";
					//console.log(response);
					console.log("Not registered");
					alert("Registration failed");
				}
				else
				 {
				// 	//console.log("Hai");
				// 	$rootScope.currentUser = response;
				 	$location.url("/login");
				}
			});
		}
		
		}
})();