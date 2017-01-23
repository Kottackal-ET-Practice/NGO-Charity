(function()
{
	angular
		.module("WhiteBoardApp")
		.controller("ProjectController", ProjectController);

	function ProjectController(UserService, $location, $rootScope, $scope, Upload)
	{
		console.log("ProjectController");
		var vm = this;
		vm.add = function(user,upload)
		{
			//console.log(user.file);
			UserService.createProject(user, function(response)
			{
				//console.log(response);

				 if(response==null)
				 {
					vm.message = "failed";
				}
				else
				 {
					console.log(response);
					$rootScope.pid = response._id;
					var id = response._id;
				  	//fileUpload(user.file,$rootScope.pid);
				  	 // if(id==undefined)
				    //   {
				    //     id=$rootScope.proj;
				    //     console.log(id);
				    //     Upload.upload(
				    //     {
				    //             url : '/routes/upload/'+id,
				    //             method: 'post',
				    //             data: user.file
				    //     });
				    //   }
				    //   else
				    //   {
				    	console.log(upload);
				      Upload.upload({
				        url : '/routes/upload/'+id,
				        method: 'post',
				        data: upload
				      });
				    }
				     // alert("Image Uploaded..");
				    //$location.url("/project");
				    

				 	$location.url("/option");
				 	//user={};
				
			});
		}

	// 	vm.fileUpload = fileUpload;
 //    function fileUpload(file,id)
 //    {
 //      console.log($scope.upload);
 //      console.log(file);
 //      console.log(id);
 //      if(id==undefined)
 //      {
 //        id=$rootScope.proj;
 //        console.log(id);
 //        Upload.upload(
 //        {
 //                url : '/routes/upload/'+id,
 //                method: 'post',
 //                data: file
 //        });
 //      }
 //      else
 //      {
 //      Upload.upload({
 //        url : '/routes/upload/'+id,
 //        method: 'post',
 //        data: file
 //      });
 //    }
 //      alert("Image Uploaded..");
 //    $location.url("/project");
 //    }
	}
})();