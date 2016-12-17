(function(){
    var app = angular.module("RentFixer");
    app.controller("ThongKeDonHangController",function($scope,$http, AccountFactory){
        $scope.active = false;
        $scope.taikhoan;
        $scope.dsYeuCau;
        $scope.isNhanXet = false;
        $scope.dsYeuCauTheoNgay = [];
        
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
                $scope.filterYeuCau();
                console.log($scope.dsYeuCauTheoNgay);
            })
            .error(function(data) {
                console.log('Error ' );
            });
            
            
        }
        
        $scope.filterYeuCau = function() {
            $scope.dsYeuCauTheoNgay = [];
            
            for(var i = 0; i < $scope.dsYeuCau.length; i++) {
                var j = 0;
                var exists = false;
                var ngayYeuCau = new Date();
                var ngayLamInfo = $scope.dsYeuCau[i].ngaylam.split("/");
                ngayYeuCau.setDate(ngayLamInfo[0]);
                ngayYeuCau.setMonth(parseInt(ngayLamInfo[1]) - 1);
                ngayYeuCau.setFullYear(ngayLamInfo[2]);
                
                for(j = 0; j< $scope.dsYeuCauTheoNgay.length; j++) {
                    
                    if(ngayYeuCau.getFullYear() == $scope.dsYeuCauTheoNgay[j].ngay.getFullYear()
                      && ngayYeuCau.getMonth() == $scope.dsYeuCauTheoNgay[j].ngay.getMonth()
                      && ngayYeuCau.getDate() == $scope.dsYeuCauTheoNgay[j].ngay.getDate()) {
                        exists = true;
                        break;
                    }
                }
                if(exists == true) {
                    $scope.dsYeuCauTheoNgay[j].yeucaus.push($scope.dsYeuCau[i]);
                } else {
                    var yeucautheongay = {
                        ngay: ngayYeuCau,
                        yeucaus: [],
                        isShow:false
                    }
                    yeucautheongay.yeucaus.push($scope.dsYeuCau[i]);
                    $scope.dsYeuCauTheoNgay.push(yeucautheongay);
                }
            }
            
            
            
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
        
        $scope.quayLai = function() {
            $scope.isNhanXet = false;
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