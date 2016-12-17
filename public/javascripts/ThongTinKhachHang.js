(function(){
    var app = angular.module("RentFixer");
    app.controller("ThongTinKhachHangController",function($scope,$http, AccountFactory){
        $scope.active = false;
        $scope.taikhoan;
        $scope.dsYeuCau;
        $scope.isNhanXet = false;
        
        
        $scope.initData = function(){
            if(AccountFactory.checkCookie() == false) {
                return;
            }
            
            $scope.taikhoan = AccountFactory.getTaiKhoan();
            $scope.hoten = AccountFactory.getHoTen();
            $http.get('api/yeucau?accountKH='+$scope.taikhoan)
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
             $scope.isNhanXet = false;
		}

        $scope.yeucauNX ;
        $scope.nhanxet;
        $scope.NhanXet = function(yeucau){
            $scope.isNhanXet = true;
            $scope.yeucauNX = yeucau;
            if(yeucau.nhanxet == undefined) {
                $scope.nhanxet = "";
            } else {
                $scope.nhanxet = yeucau.nhanxet;
            }
        }
        
        
        $scope.SaveNhanXet = function(){
            
            $http.put('api/yeucau/'+ $scope.yeucauNX._id,{nhanxet: $scope.nhanxet})
		        .success(function(data) {
                $scope.yeucauNX.nhanxet = $scope.nhanxet;
                    $scope.isNhanXet = false;
		        }).error(function(data) {
		            console.log('Error: ' + data);
                    $scope.isNhanXet = false;
        		});
        }
    });
    
}());