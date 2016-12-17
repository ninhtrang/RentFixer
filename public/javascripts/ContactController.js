(function(){
    var app = angular.module("RentFixer");
    app.controller("ContactController",function($scope,$http){
        $scope.contact = {
            ten: "",
            sdt: "",
            email: "",
            noidung: ""
        }
        
        $scope.guiEmail = function() {
            if($scope.contact.ten == "" ) {
                alert("name??");
            }
            
            /////
            
            $http.post("api/email", $scope.contact)
                .success(function(data) {
                    alert("Gui thanh cong");
                }).error(function(error) {
                    alert("Gui that bai.");
            });
            
        }
    });
}());
