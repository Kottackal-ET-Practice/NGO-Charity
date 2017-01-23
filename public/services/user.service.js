(function()
{
	angular
		.module("WhiteBoardApp")
		.factory("UserService", UserService);
	function UserService($http)
	{
		var service = {
			createUser: createUser,
			loginUser: loginUser,
			updateUser : updateUser,
			logoutUser : logoutUser,
			createProject : createProject,
			updateOption : updateOption,
			editProject : editProject,
			updateDonate : updateDonate,
			Donateupdate : Donateupdate,
			vieww : vieww,
			groupcreate : groupcreate,
			memberadd : memberadd,
			groupupdate : groupupdate,
			groupview : groupview,
			groupmanage: groupmanage,
			saveSelect : saveSelect,
			viewvote : viewvote,
			voteproject : voteproject,
			updateProject : updateProject,
			historyy : historyy,
			paymentview: paymentview,
			projectSelect: projectSelect,
			voteHistory : voteHistory,
			groupupdateid : groupupdateid,
			deletetemp	: 	deletetemp
		};
		return service;

		function deletetemp(callback)
		{
			$http.get("/rest/tempdrop")
				.success(callback);
		}

		function logoutUser(user, callback)
		{
			$http.post("/rest/logoutt")
				.success(callback);
		}

		function updateUser(user, callback)
		{
			$http.put("/rest/update", user)
				.success(callback);
		}

		function updateProject(user, callback)
		{
			$http.put("/rest/updateproject", user)
				.success(callback);
		}

		function updateDonate(user,id,callback)
		{
			$http.put("/rest/updatee/"+id, user)
				.success(callback);
		}

		function Donateupdate(user,id,callback)
		{
			$http.put("/rest/up/"+id, user)
				.success(callback);
		}

		function createUser(user, callback)
		{
			$http.post("/rest/register", user)
				.success(callback);
		}

		function saveSelect(gid, pid, callback)
		{
			$http.post("/rest/select/"+gid + '/' +pid)
			 	.success(callback);
		}

		function createProject(user, callback)
		{
			$http.post("/rest/project", user)
				.success(callback);
		}

		function updateOption(user,id,callback)
		{
			$http.put("/rest/updateOption/"+id, user)
				.success(callback);
		}

		function editProject(user,callback)
		{
			$http.get("/rest/projectEdit/"+user)
				.success(callback);
		}

		function projectSelect(id,callback)
		{
			$http.get("/rest/selectProject/"+id)
				.success(callback);
		}

		function vieww(id,callback)
		{
			$http.get("/rest/projectdonationHistory/"+id)
				.success(callback);
		}

		function voteHistory(user,id,callback)
		{
			console.log("UserService...");
			$http.get("/rest/projectHistory/"+id + '/' +user)
				.success(callback);
		}

		function loginUser(user, callback)
		{
			$http.post("/rest/login", user)
				.success(callback);
		}

		function groupcreate(user, id, callback)
		{
			$http.post("/rest/groupprofile/"+id, user)
				.success(callback);
		}

		function groupupdate(user, id, callback)
		{
			$http.put("/rest/updateGroup/"+id+ '/' +user)
				.success(callback);
		}


		function groupupdateid(user, id, callback)
		{
			$http.put("/rest/updateGroupid/"+id+ '/' +user)
				.success(callback);
		}

		function memberadd(user, callback)
		{
			$http.post("/rest/memAdd/", user)
				.success(callback);
		}

		function voteproject(p,obj, callback)
		{
			$http.post("/rest/projectvote",p)
				.success(callback);
		}

		function groupview(user,callback)
		{
			$http.get("/rest/viewgroup/"+user)
				.success(callback);
		}

		function viewvote(user,callback)
		{
			$http.get("/rest/viewvote/"+user)
				.success(callback);
		}

		function paymentview(user,callback)
		{
			$http.get("/rest/viewpayment/"+user)
				.success(callback);
		}

		function groupmanage(user,callback)
		{
			$http.get("/rest/managegroup/"+user)
				.success(callback);
		}

		function historyy(user,callback)
		{
			$http.get("/rest/history/"+user)
				.success(callback);
		}
	}
})();