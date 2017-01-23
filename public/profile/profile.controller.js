(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ProfileController", ProfileController);

	function ProfileController(UserService, $rootScope,$location,$http,$scope)
	{
		var vm = this;

		vm.updateUser = updateUser;
		vm.loadimage = loadimage;

		function updateUser(user){
			console.log($rootScope.currentUser);
			UserService.updateUser(user, function(response){
				console.log(response);
			});
			alert("Profile Updated..");
			var r=$rootScope.currentUser.role;
			console.log(r);
			if(r=='user')
			{
				$location.url("/singlehome");
			}
			else
				$location.url("/home");
		}

		 vm.loadimage = loadimage;
		function loadimage(){
			console.log("Loading Image...");
			var id=$rootScope.currentUser._id;
			$http.get('/routes/recieve/'+id).success(function (data, status, headers, config) {
               var f=data[0];
               $scope.newPathName = f.file[0].filename;
			   console.log($scope.newPathName);
            })
            .error(function (data, status, header, config) {
                
            });
		}
	}
})();