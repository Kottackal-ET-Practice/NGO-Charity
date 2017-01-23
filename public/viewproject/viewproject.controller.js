(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ProjectviewController", ProjectviewController);

	function ProjectviewController(UserService, $rootScope, $scope, $http, $location, $routeParams)
	{
		var vm = this;

		var id = $routeParams.p;
		console.log(id);
		$rootScope.proj=id;

		vm.selectProject = selectProject;

		function selectProject(){
			UserService.projectSelect(id,function(response){
				$scope.project= response;
				console.log(response);
			});

		}

		 vm.loadimage = loadimage;
		function loadimage(){
			console.log("Loading Image...");
			console.log(id);
			$http.get('/routes/recieve/'+id).success(function (data, status, headers, config) {
               var f=data[0];
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
			console.log($rootScope.currentUser);
			//console.log(user._id);
			UserService.updateDonate(user,$rootScope.currentUser._id,function(response){
				console.log(response);
			});
			alert("Donated..");
			window.location.href='#/donate';
			
		}
		vm.closed = closed;
		
		function closed(){
			console.log("DonateContoller..........");
			window.location.href='#/view';
			
		}
		vm.edit = edit;
		function edit(user){
			$rootScope.value=user;
			window.location.href='#/editt';
			};


	}
})();