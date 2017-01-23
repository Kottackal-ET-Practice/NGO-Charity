(function()
{
	angular
		.module("WhiteBoardApp")
		.config(Config);
	
	function Config($routeProvider)
	{
		$routeProvider
			.when("/home", 
				{
					templateUrl: "home/home.view.html"
				})
			.when("/register", 
				{
					templateUrl: "register/register.view.html",
					controller : "RegisterController as controller"
				})
			.when("/login", 
				{
					templateUrl: "login/login.view.html",
					controller: "LoginController as controller"
				})
			.when("/profile", 
				{
					templateUrl: "profile/profile.view.html",
					controller: "ProfileController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/admin", 
				{
					templateUrl: "admin/admin.view.html",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/logout", 
				{
					templateUrl: "home/home.view.html",
					controller: "MainController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/project", 
				{
					templateUrl: "addproject/project.view.html",
					controller: "ProjectController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/option", 
				{
					templateUrl: "addproject/option.view.html",
					controller: "OptionController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/view", 
				{
					templateUrl: "addproject/edit.view.html",
					controller: "EditController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/donate", 
				{
					templateUrl: "singleuser/donate.view.html",
					controller: "DonateController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/payment", 
				{
					templateUrl: "group/payment.view.html",
					controller: "PaymentController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/groupdonate", 
				{
					templateUrl: "group/donate.view.html",
					controller: "GroupDonateController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/upload",{
					templateUrl: "addproject/uploadimage.view.html",
					resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/file",{
					templateUrl: "file.html",
					controller: "FileController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/userfile",{
					templateUrl: "file.user.html",
					controller: "FileController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/history", 
				{
					templateUrl: "singleuser/history.view.html",
					controller: "HistoryController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/singlehome", 
				{
					templateUrl: "singleuser/singlehome.view.html",
					controller: "HomeController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/editt", 
				{
					templateUrl: "addproject/editt.view.html",
					controller: "EdittController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/grouphome", 
				{
					templateUrl: "group/grouphome.view.html",
					// controller: "HomeController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/memberprofile", 
				{
					templateUrl: "group/memberprofile.view.html",
					controller: "MemberController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/grouphistory", 
				{
					templateUrl: "group/grouphistory.view.html",
					// controller: "HomeController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/votinghistory", 
				{
					templateUrl: "group/votinghistory.view.html",
					controller: "VotinghistoryController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/groupprofile", 
				{
					templateUrl: "group/groupprofile.view.html",
					controller: "GroupController as controller",
					resolve : {
						loggedin : checkLoggedIn
					}
				})
			.when("/viewgroup",
			{
				templateUrl: "group/viewgroup.view.html",
				controller: "ViewgroupController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/managegroup",
			{
				templateUrl: "group/managegroup.view.html",
				controller: "ManagegroupController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/voting",
			{
				templateUrl: "group/voting.view.html",
				controller: "VoteController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/adminhistory",
			{
				templateUrl: "admin/adminhistory.view.html",
				controller: "AdminhistoryController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/editgroup",
			{
				templateUrl: "group/editgroup.view.html",
				controller: "GroupeditController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/details/:p",
			{
				templateUrl: "viewproject/viewproject.view.html",
				controller: "ProjectviewController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.when("/detailsgroup/:p",
			{
				templateUrl: "viewproject/projectview.view.html",
				controller: "ViewController as controller",
				resolve : {
						loggedin : checkLoggedIn
					}
			})
			.otherwise({redirectTo:"/home"})
		}
})();

function checkLoggedIn($q, $http, $location, $rootScope){
	var deferred = $q.defer();
	$http.get("/rest/loggedin").success(function(user){
		if(user!='0'){
			$rootScope.currentUser = user;
			deferred.resolve();
		}
		else{
			$rootScope.currentUser = null;
			deferred.reject();
			$location.url("/home");
		}
	});

	return deferred.promise;
}