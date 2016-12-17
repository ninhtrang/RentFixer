(function(){
    var app = angular.module("RentFixer");    
app.controller("DangNhap",function($scope,$http,$timeout, AccountFactory){
            
        $scope.data = {
            cmnd: "",
            taikhoan: "",
            matkhau: "",
            hoten: "",
            email: "",
            diachi: ""
        } 
        $scope.dangKiFixer = false;
            
        $scope.registed = false;
        $scope.AccountKH ={
            taikhoan :"",
            matkhau : "",
            hoten :""
        };
        
        $scope.initDataOfDangNhapController = function() {
            $scope.registed = AccountFactory.checkCookie();
            $scope.AccountKH.taikhoan = AccountFactory.getTaiKhoan();
            $scope.AccountKH.hoten = AccountFactory.getHoTen();
        }
            
            
            
         // DANG NHAP FORM
        $scope.showDangNhap = function(){
            $scope.AccountKH.taikhoan="";
            $scope.AccountKH.matkhau="";
			$('#DangNhapForm').modal({backdrop: 'static'},'show');
        }    
        $scope.closeDangNhap = function(){
			$('#DangNhapForm').modal('hide');
		}
                
         $scope.DangNhap = function(){
              $http.get('api/account?taikhoan='+$scope.AccountKH.taikhoan+'&&matkhau='+$scope.AccountKH.matkhau)
            .success(function(data) {
                if(data.length > 0 ){
               AccountFactory.setAccountToCookie($scope.AccountKH.taikhoan, $scope.AccountKH.matkhau,data[0].hoten);
                    $scope.AccountKH.hoten = AccountFactory.getHoTen();
                    $scope.registed = true;
                    $scope.closeDangNhap();
                }
            })
            .error(function(data) {
                console.log('Error ' );
            });
             
         }       
        // DANG KY FORM
        $scope.showDangKy = function(){
           $('#DangNhapForm').modal('hide');
                $('#DangKyForm').modal({backdrop: 'static'},'show');
            
           if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					AccountFactory.layDiaChiGoogleMapApi(pos.lat, pos.lng).then(function(data){
						$scope.data.diachi = data.results[0].formatted_address;
                        console.log("gg data");
                        console.log(data.results[0]);
					})
					
				});
			}
			// Browser doesn't support Geolocation
			else {
				alert('Trình duyệt không hỗ trợ chức năng này!!');
			}
            
        }
		$scope.closeDangKy = function(){
			$('#DangKyForm').modal('hide');
		}
        
        $scope.showDanhSachYeuCau = function(){
            $('#formDanhSachYeuCau').modal({backdrop: 'static'},'show');
        }
        
        // DANG XUAT
        $scope.DangXuat = function(){
            AccountFactory.setAccountToCookie(undefined,undefined);
            $scope.registed = false;
        }
        
        
        // DANG KY
           
        $scope.DangKy = function(){
            if($scope.dangKiFixer) {
                $scope.dangKiLamFixer();
            } else {
                $scope.dangKiKhachHang();
            }
        }
        
        $scope.dangKiLamFixer = function() {
            
            var fixerData = {
                   cmnd: $scope.data.cmnd,
                   hoten: $scope.data.hoten,
                   email: $scope.data.email,
                   sodt: $scope.data.sodt,
                   diachi: $scope.data.diachi
            }
            
            $http.post('/api/fixer', fixerData)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("Bạn đã đăng ký thành công!");
                      }, function errorCallback(response) {
                       alert("Bạn đã đăng ký thất bại!");
                      });
        }
        
        $scope.dangKiKhachHang = function() {
            var KHData = {
                   taikhoan: $scope.data.taikhoan,
                   matkhau: $scope.data.matkhau,
                   hoten: $scope.data.hoten,
                   email: $scope.data.email,
                   sodt: $scope.data.sodt,
                   diachi: $scope.data.diachi
            }
            
            $http.post('/api/account', KHData)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("Bạn đã đăng ký thành công!");
                      }, function errorCallback(response) {
                       alert("Bạn đã đăng ký thất bại!");
                      });
        }
        
    });
}());