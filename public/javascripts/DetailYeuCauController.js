

var app = angular.module("RentFixer1", []);
  app.controller("DetailSYeuCauController",function($scope,$http){
       $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/detailyeucau', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }

    });

 app.controller("DetailYeuCauController",function($scope,$http){
       $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/detailyeucau', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }

    });