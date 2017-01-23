(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("HomeController", HomeController);

	function HomeController(UserService, $rootScope, $scope, $http)
	{
		var vm = this;

		 vm.loadimage = loadimage;
		function loadimage(){
			console.log("Loading Image...");
			//console.log(id);
			$http.get('/routes/carousel/').success(function (data, status, headers, config) {
               var f=data[0];
               $scope.newPathName = f.file[0].filename;
			   console.log($scope.newPathName);
            })
            .error(function (data, status, header, config) {
                
            });
		}

	}
})();