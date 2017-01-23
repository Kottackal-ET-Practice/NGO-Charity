(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("VoteController", VoteController);

	function VoteController(UserService, $rootScope, $scope)
	{
		var vm = this;
		$scope.arr = [];


		vm.viewvote = viewvote;
		vm.deleted= deleted;
		var user=$rootScope.currentUser;
		

		function deleted(){
				UserService.deletetemp(function(response){
					console.log("Controller deleted");
			});
		};

		function viewvote(){
				UserService.viewvote(user._id,function(response){
				$scope.projectlist = response;
				//$scope.list = response.a;
				//$rootScope.g=response.a[0].GroupID;
				//console.log(response.a);
			});
		};

		vm.read = read;

		function read(opt){
			console.log("VoteController");
			$rootScope.project = opt;
			console.log(opt.option,opt.name);
			if (opt.option==true)
				$scope.arr.push(opt.name);
			//console.log($scope.arr);

		}

		// vm.clear = clear;

		// function clear(){
		// 			$scope.arr = [];
		// }

		vm.vote = vote;
		
		function vote(p){
			console.log("VoteController");
			
			//console.log(p.GroupId);
			p.array=$scope.arr;
			console.log(p);
			UserService.voteproject(p,$scope.arr,function(response){
				
			});
			$scope.arr = [];
		}

	}

	
})();