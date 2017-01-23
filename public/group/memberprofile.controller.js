(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("MemberController", MemberController);

  function MemberController(UserService, $location, $rootScope, $scope)
  {
    
    console.log("MemberController");
    var vm = this;
    var mid;
    var gid=$rootScope.group;
    console.log(gid);

    vm.addmember = addmember;
    vm.addmemberid = addmemberid;
    vm.closed =closed;
   function addmember(user){
      
      console.log("Add Member Function");
      UserService.memberadd(user, function(response){
        
       mid=response._id;
       console.log(mid);
       console.log(gid._id);
       UserService.groupupdate(mid,gid._id, function(response){
        console.log("member id");
        console.log(mid);
        //     console.log(response);
      });
       });
        $scope.project={};
      alert("Member Added..");
     
     }

    function addmemberid(user){
            
       UserService.groupupdateid(user, gid._id, function(response){
        console.log("member id");
         console.log(response);
      });
      
      $scope.project={};
      alert("Member Added..");
     
     }
     function closed(){
      $location.url("/groupprofile");
    }
  }
})();