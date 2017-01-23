(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("PaymentController", PaymentController);

	function PaymentController(UserService, $rootScope, $scope)
	{
		var vm = this;
		//$scope.arr = [];


		vm.viewpayment = viewpayment;
		var user=$rootScope.currentUser;
		
		function viewpayment(){
			console.log("Payment Controller.....");
				UserService.paymentview(user._id,function(response){
				$scope.projectlist = response;
				//$scope.list = response.a;
				//$rootScope.g=response.a[0].GroupID;
				//console.log(response.a);

				console.log($scope.projectlist);
			});


	// 	vm.read = read;

	// 	function read(opt){
	// 		console.log("VoteController");
	// 		$rootScope.project = opt;
	// 		console.log(opt.option,opt.name);
	// 		if (opt.option==true)
	// 			$scope.arr.push(opt.name);
	// 		//console.log($scope.arr);

	// 	}

	// 	// vm.clear = clear;

	// 	// function clear(){
	// 	// 			$scope.arr = [];
	// 	// }

		vm.pay = pay;
		
		function pay(p){
			console.log("Payment.....");
			UserService.Donateupdate(user,p._id,function(response){
				console.log(response);
				alert("Payment Done....")
				window.location.href='#/payment';
			});
		
		}
		vm.closed = closed;
		
		function closed(p){
			window.location.href='#/singlehome';
		}

	}

	}
})();