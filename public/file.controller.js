// (function()
// {
//   angular
//     .module("WhiteBoardApp")
//     .controller("FileController", FileController);

//   function FileController(UserService, $location, $rootScope,$scope,Upload)
//   { 

//     console.log("FileController........");
//     var vm = this;

//     vm.fileUpload = fileUpload;
//     function fileUpload(file,id){
//       console.log($scope.upload);
//       console.log(file);
//       console.log(id);
//       // if(id==undefined)
//       // {
//       //   id=$rootScope.proj;
//       //   console.log(id);
//       // }
//       Upload.upload({
//         url : '/routes/upload/'+id,
//         method: 'post',
//         data: file
//       });
//       alert("Image Uploaded..");
//     $location.url("/project");
//     }
//   }
// })();
(function()
{
  angular
    .module("WhiteBoardApp")
    .controller("FileController", FileController);

  function FileController(UserService, $location, $rootScope, $scope, Upload)
  { 

    console.log("FileController");
    var vm = this;


    vm.fileUpload = fileUpload;
    vm.fileUploaduser = fileUploaduser;



    function fileUpload(file,id)
    {
      console.log($scope.upload);
      console.log(file);
      console.log(id);
      if(id==undefined)
      {
        id=$rootScope.proj;
        console.log(id);
        Upload.upload(
        {
                url : '/routes/upload/'+id,
                method: 'post',
                data: file
        });
      }
      else
      {
      Upload.upload({
        url : '/routes/upload/'+id,
        method: 'post',
        data: file
      });
    }
      alert("Image Uploaded..");
    $location.url("/project");
    }


    function fileUploaduser(file,id)
    {
      console.log($scope.upload);
      console.log(file);
      console.log(id);
      if(id==undefined)
      {
        id=$rootScope.currentUser._id;
        console.log(id);
        Upload.upload(
        {
            url : '/routes/upload/'+id,
            method: 'post',
            data: file
        });
      }
    alert("Image Uploaded..");
      var r=$rootScope.currentUser.role;
      console.log(r);
      if(r=='user')
      {
        $location.url("/singlehome");
      }
      else
        $location.url("/home");
    }
}
})();