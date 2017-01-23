(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("AdminhistoryController", AdminhistoryController);

	function AdminhistoryController(UserService, $rootScope, $scope,$http)
	{
		var vm = this;


		vm.editProjects = editProjects;

		function editProjects(user){
			console.log("Group Donate Controller....");
			console.log(user);
			UserService.editProject(user,function(response){
				$scope.projectlist = response;
				
				//console.log(response[0].donation);
				$rootScope.c=((response[0].donation/response[0].total)*100).toFixed(2);
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

		
	}
})();