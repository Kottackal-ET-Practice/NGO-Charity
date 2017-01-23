(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("DonateController", DonateController);

	function DonateController(UserService, $rootScope, $scope, $http, $location)
	{
		var vm = this;


		vm.editProjects = editProjects;

		function editProjects(user){
			console.log(user);
			UserService.editProject(user,function(response){
				$scope.projectlist = response;
				// var d=$scope.projectlist[0].description;
				// $scope.e=d.split(" ").splice(0,3).join(" ");
			});

		}

		vm.donate = donate;
		var id;
		function donate(user){
			console.log("DonateContoller..........");
			console.log($rootScope.currentUser);
			//console.log(user._id);
			UserService.updateDonate(user,$rootScope.currentUser._id,function(response){
				console.log(response);
			});
			alert("Donated..");
			window.location.href='#/donate';
			
		}

		vm.loadimage = loadimage;
		function loadimage(id){
			console.log("Loading Image...");
			console.log(id);
			$http.get('/routes/recieve/'+id).success(function (data, status, headers, config) {
               var f=data[0];
               	//console.log(f);
    			//path=f.file[0].path;
    			//pathArray = path.split('/');
    			//var newPath = "";
				// for (i = 1; i < pathArray.length; i++) {
				//   newPath += "/";
				//   newPath += pathArray[i];
				// }
				$scope.newPathName = f.file[0].filename;
				console.log($scope.newPathName);
            })
            .error(function (data, status, header, config) {
                
            });
		}

	}
})();