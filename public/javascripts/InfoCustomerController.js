(function(){
    var app = angular.module("RentFixer");
    app.controller("InfoCustomerController",function($scope,$http, AccountFactory){
        $scope.taikhoan;
        $scopeisChange = false;
        $scope.isHide = true;
        
        $scope.initData = function(){
            if(AccountFactory.checkCookie() == false) {
                return;
            }
            
            $scope.taikhoan = AccountFactory.getTaiKhoan();
            
            $http.get('api/account?taikhoan='+$scope.taikhoan)
            .success(function(data) {
                console.log(data);
                $scope.CuryCus = data[0];
                console.log($scope.CuryCus.hoten);
            })
            .error(function(data) {
                console.log('Error ' );
            });
            
        }
        
        $scope.Save = function(){
            var updatedData = {
                taikhoan: $scope.CuryCus.taikhoan,
                hoten: $scope.CuryCus.hoten,
                email: $scope.CuryCus.email,
                diachi: $scope.CuryCus.diachi
                }
            $http.put('api/account/'+ $scope.CuryCus._id, updatedData).success(function(data) {
//                $scope.CuryCus = $scope.CuryCus;
//                    $scope.isNhanXet = false;
                 console.log('success: ' + data);
                alert("Bạn đã lưu thành công!");
		        }).error(function(data) {
		            console.log(data);
//                    $scope.isNhanXet = false;
        		  alert("e");
            });
        }
        
        $scope.ThayDoi = function(){
            $scope.isChange = true;
            $scope.isHide = false;
        }
        $scope.Cancle = function(){
            $scope.isChange = false;
            $scope.isHide = true;
        }
        $scope.SavePass = function(){
        if($scope.NewPass !== $scope.ReNewPass){
            alert("2 Pass không trùng nhau!")
        }else{
            $scope.CuryCus.matkhau = $scope.NewPass;
            $scope.isChange = false;
            $scope.isHide = true;
            $http.put('api/account/'+ $scope.CuryCus._id, {matkhau: $scope.CuryCus.matkhau}).success(function(data) {
//                $scope.CuryCus = $scope.CuryCus;
//                    $scope.isNhanXet = false;
                 console.log('success: ' + data);
                alert("Bạn đã lưu thành công!");
		        }).error(function(data) {
		            console.log(data);
//                    $scope.isNhanXet = false;
        		  alert("e");
            });
            
        }
    }
      
    });
    
    
    
}());