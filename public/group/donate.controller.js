(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("GroupDonateController", GroupDonateController);

	function GroupDonateController(UserService, $rootScope, $scope,$http)
	{
		var vm = this;


		vm.editProjects = editProjects;

		function editProjects(user){
			console.log("Group Donate Controller....");
			console.log(user);
			UserService.editProject(user,function(response){
				$scope.projectlist = response;
				console.log($scope.projectlist);
			});
			
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

		vm.donate = donate;
		var id;
		function donate(user){
			console.log("DonateContoller..........");
			$rootScope.id=user;
			console.log($rootScope.currentUser);
			//console.log(user._id);
			UserService.updateDonate(user,$rootScope.currentUser._id,function(response){
				console.log(response);

				//window.location.href='#/donate';
			});
		}

		vm.select = select;
		function select(id)
		{
			console.log("Selected Project Id");
			console.log(id);
			console.log($rootScope.grpid);
			UserService.saveSelect($rootScope.grpid,id,function(response){
				console.log(response);
				alert("Selected");
				//window.location.href='#/donate';
			});

			// $http.get('/routes/recieve/'+id)
			// .success(function (data, status, headers, config) {
   //             var f=data[0];
   //             path=f.file[0].path;
   //             pathArray = path.split('/');
   //             var newPath = "";
			// 	for (i = 1; i < pathArray.length; i++) {
			// 	  newPath += "/";
			// 	  newPath += pathArray[i];
			// 	}
			// 	$rootScope.newPathName = newPath;
			// 	console.log(newPath);
   //          })
   //          .error(function (data, status, header, config) {
                
   //          });
		}
	}
})();