var myApp = angular.module('myApp', []); 
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

$scope.success = false;
$scope.failure = false;
$scope.registerSuccess = false;
$scope.registerFailure = false;
$scope.loginUser = function(){
    $http.post('/loginuser',$scope.user).then(function (res) {
          $scope.result = res;
          if($scope.result){
            if($scope.result.data[0] && $scope.result.data[0].email == $scope.user.email && $scope.result.data[0].password == $scope.user.password){
                $scope.success = true;
                $scope.failure = false;
            }
            else{
                $scope.failure = true;
                $scope.success = false;
            }
          }
        });
    console.log($scope.result);
}

$scope.registerUser = function(){
    $http.post('/registeruser',$scope.userregister).then(function (res) {
          if(res.data.ok==1){
            $scope.registerSuccess = true;
            $scope.registerFailure = false;
          }else{
            $scope.registerSuccess = false;
            $scope.registerFailure = true;
          }
        });
    console.log($scope.result);
}

}]);
