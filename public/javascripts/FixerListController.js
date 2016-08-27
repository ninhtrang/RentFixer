(function(){
    var app = angular.module("RentFixer");
    app.controller("FixerListController",function($scope,$http,$timeout){
        $scope.dsFixer = [];
        $scope.loadingSlick = true;
        $scope.slickconfig = {
                lazyLoad: 'ondemand',
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                rows: 1,
                arrows: true
            }


         $http.get('api/fixer')
            .success(function(data) {
                console.log(data);
                $scope.loadingSlick = false;
                $scope.dsFixer = data;
            })
            .error(function(data) {
                console.log('Error ' );
            });
        
        // TO DO : UPDATE FIXER INFO(NGAYSINH - TUOI)

        
        $scope.xemChiTietFixer = function(id){
			$scope.cmnd = id;
            console.log($scope.cmnd);
			$timeout(function(){
				$('#xemchitietfixerform').submit();
			},300);
		}

    });
    
        app.controller("DangNhap",function($scope,$http,$timeout, AccountFactory){
        $scope.registed = false;
        $scope.AccountKH ={
            taikhoan :"",
            matkhau : ""
        };
        
        $scope.initDataOfDangNhapController = function() {
            $scope.registed = AccountFactory.checkCookie();
            $scope.AccountKH.taikhoan = AccountFactory.getTaiKhoan();
        }
            
            
            
         // DANG NHAP FORM
        $scope.showDangNhap = function(){
			$('#DangNhapForm').modal({backdrop: 'static', keyboard: false},'show');
        }    
        		$scope.closeDangNhap = function(){
			$('#DangNhapForm').modal('hide');
		}
                
         $scope.DangNhap = function(){
              $http.get('api/account?taikhoan='+$scope.AccountKH.taikhoan+'&&matkhau='+$scope.AccountKH.matkhau)
            .success(function(data) {
                if(data.length > 0 ){
                    AccountFactory.setAccountToCookie($scope.AccountKH.taikhoan, $scope.AccountKH.matkhau);
                    $scope.registed = true;
                }
            })
            .error(function(data) {
                console.log('Error ' );
            });
             
         }       
        // DANG KY FORM
        $scope.showDangKy = function(){
       $('#DangNhapForm').modal('hide');
			$('#DangKyForm').modal({backdrop: 'static', keyboard: false},'show');
		}
		$scope.closeDangKy = function(){
			$('#DangKyForm').modal('hide');
		}
        
        
        // DANG XUAT
        $scope.DangXuat = function(){
            AccountFactory.setAccountToCookie(undefined,undefined);
            $scope.registed = false;
        }
        
        
        // DANG KY
           $scope.data = {
           } 
           $scope.DangKy = function(){
            $http.post('/api/account', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("Bạn đã đăng ký thành công!");
                      }, function errorCallback(response) {
                       alert("Bạn đã đăng ký thất bại!");
                      })
        }
    });

    
}());


