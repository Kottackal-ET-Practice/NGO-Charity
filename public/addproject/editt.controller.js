(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("EdittController", EdittController);

	function EdittController(UserService, $rootScope, $scope, $location, $http)
	{
		var vm = this;

		vm.editt = editt;

		function editt(pjt){
			
			console.log(pjt);
			
			UserService.updateProject(pjt, function(response){
				console.log(response);
			});

		alert("Project Updated..");
		$location.url("/view");
		}
		vm.loadimage = loadimage;
		function loadimage(){
			console.log("Loading Image...");
			var id=$rootScope.proj;
			console.log(id);
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