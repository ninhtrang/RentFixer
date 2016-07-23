var app = angular.module("demo1", []);
    app.controller("FixerListController", function ($scope, $http) {
        $scope.data = {
//                cmnd : "sfdd",
//                hoten : "dung",
//                quequan : "tb",
//                sodt : 145678,
//                hinhanh : "gjg",
//                luong : 32,
//                quyenhethong : 1,
//                email : "dfjkf"
//            
//                cmnd : {type: Number, unique: true},
//                hoten : String,
//                ngaysinh : Date,
//                sodt : Number,
//                quequan : String,
//                quan : String,
//                sotruong:[],
//                sonamkinhnghiem : Number,
//                motakinhnghiem : String,
//                hinhanh : String,
//                luong : Number,
//                danhgia : String,
//                email : String
            
        }
        
        $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/fixer', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
    });

app.controller("DichVuController", function($scope,$http){
   $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/dichvu', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
});