(function(){
    var app = angular.module("RentFixer");
    app.controller("ThongTinKhachHangController",function($scope,$http, AccountFactory){
        $scope.taikhoan;
        $scope.dsYeuCau;
        
        $scope.initData = function(){
            if(AccountFactory.checkCookie() == false) {
                return;
            }
            
            $scope.taikhoan = AccountFactory.getTaiKhoan();
            
            $http.get('api/yeucau?hotenKH='+$scope.taikhoan)
            .success(function(data) {
                console.log(data);
                $scope.dsYeuCau = data;
            })
            .error(function(data) {
                console.log('Error ' );
            });
        }
         

        
        $scope.closeDanhSachYeuCau = function(){
			$('#formDanhSachYeuCau').modal('hide');
		}


    });
    
}());