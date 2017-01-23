(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("OptionController", OptionController);

  function OptionController(UserService, $location, $rootScope,$scope)
  { 
    var max=100,temp=0;

    $scope.avail=100;

    console.log("OptionController");
    var vm = this;

    vm.closed=closed;
    vm.addOption = addOption;
    function addOption(user){
      console.log("addOption");

        temp=temp+user.percent;
        $scope.avail=max-temp;

        console.log(temp,$scope.avail,max,user.percent);

        if ($scope.avail>=0) {

          UserService.updateOption(user, $rootScope.pid, function(response){
            console.log(response);
          });
        }
        else {
          $scope.avail=$scope.avail+user.percent;
          temp=temp-user.percent;
          console.log('after');
          console.log(temp,$scope.avail,max,user.percent);
        }
        alert("Option added..");
       $scope.project={};
    }

     function closed(){
      $location.url("/project");
     }
  }
})();