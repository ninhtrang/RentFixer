(function(){
    var app = angular.module("RentFixer");
    app.controller("SearchDetailController",function(FixerFactory,DataFactory,AccountFactory, $scope,$http,$timeout){
       
        $scope.dataTimKiem = {};
        $scope.loading = true;
        $scope.isDetail = false;
        $scope.isSearch = false;
        $scope.isDonHang = false;
        $scope.ngscDcChon = {};
        $scope.data={
            giobd: "6:00 giờ",
            giokt: "8:00 giờ"
        }
        $scope.giobdNew ={};
        $scope.gioktNew = {};
        $scope.searchData = {
          tenquan: "",
          tendichvu: "",
          ngay: "",
          giobd: "",
          giokt: "",
          giotb : "",
          tongchiphi : "",
          ngaydatyeucau:""
        };
        $scope.taikhoanKH = AccountFactory.getTaiKhoan();
        $scope.ngvs = [];
        $scope.dsGio = [];
        $scope.dsTuongDong = [];
        $scope.initDataFirstTime = function(tenquan,tendichvu,ngay,giobd,giokt){
            $scope.isSearch = true;  
            $scope.searchData.tenquan = tenquan;
              $scope.searchData.tendichvu= tendichvu;
              $scope.searchData.ngay= ngay;
              $scope.searchData.giobd= giobd;
              $scope.searchData.giokt = giokt;
              $scope.searchData.giotb = giokt-giobd;
            
            
            for(var giofixer = 0; giofixer < DataFactory.dsGio.length; giofixer++ ){
                if(DataFactory.dsGio[giofixer].value == giobd)
                    {
                        $scope.giobdNew = DataFactory.dsGio[giofixer];
                    }
                if(DataFactory.dsGio[giofixer].value == giokt)
                    {
                        $scope.gioktNew = DataFactory.dsGio[giofixer];
                    }
            }
            
            $scope.searchData.giobd= $scope.giobdNew.name;
            $scope.searchData.giokt = $scope.gioktNew.name;
            $scope.data.giobd= $scope.giobdNew.name;
            $scope.data.giokt = $scope.gioktNew.name;
            
            
        // TÌM DỊCH VỤ THEO TÊN DỊCH VỤ
            $scope.SearchDichVu();
        // FILTER QUAN VA DICH VU  
           

         $scope.Search();
        //LAY DANH SACH QUAN
            
        $scope.quans = [];
         $http.get('api/quan')
            .success(function(data) {
                $scope.quans = data;
            })
            .error(function(data) {
                console.log('Error ' );
            });
            
        // LAY DANH SACH DICH VU
            
        $scope.dichvus = [];
        $http.get('api/dichvu')
            .success(function(data) {
                $scope.dichvus = data;
            })
            .error(function(data) {
                console.log('Error ' );
            });
        // LAY DANH SACH GIO
            
          $scope.dsGio = DataFactory.dsGio;
            
            
        }
        
        $scope.daDangKi = false;
        
        $scope.checkDangKi = function() {
            $scope.taikhoanKH = AccountFactory.getTaiKhoan();
            $http.get('api/account?taikhoan='+$scope.data.sodt)
                .success(function(data) {
                    if(data.length > 0 && ($scope.taikhoanKH == undefined)){
                        $scope.daDangKi = true;
                    } else {
                        $scope.daDangKi = false;
                    }
                })
                .error(function(data) {
                    console.log('Error ' );
                });
        }
        
        // HÀM TÌM DỊCH VỤ THEO TÊN DỊCH VỤ
           $scope.dichvu1 = {
                tenDichVu : "",
                phiTheoGio : "",
                mota : ""
            };
        $scope.SearchDichVu = function(){
            $http.get('api/dichvu?tendichvu='+$scope.searchData.tendichvu)
            .success(function(data){
                 $scope.dichvu1 = data[0];
                 $scope.tinhphi();
            })
            .error(function(data){
                console.log('Error ');
            });
        }
        
        // HÀM TÍNH TỔNG CHI PHÍ
        $scope.tinhphi = function(){
            
            $scope.searchData.tongchiphi = (($scope.searchData.giotb/60)*($scope.dichvu1.phiTheoGio));
        }
        2
        // kiểm tra trước lúc search
        
        $scope.Search = function(){
            
             if ( $scope.kiemtra() == false ){
                   alert("Vui lòng nhập đầy đủ thông tin trước khi tìm kiếm");
                   return false;
               }
                
            // if giomoi va giocu, tim gia tri moi tuong ung, gan gio cu thanh gio moi
             for(var giofixer = 0; giofixer < DataFactory.dsGio.length; giofixer++ ){
                if(DataFactory.dsGio[giofixer].name == $scope.data.giobd) {
                        $scope.giobdNew = DataFactory.dsGio[giofixer];
                    }
                if(DataFactory.dsGio[giofixer].name == $scope.data.giokt) {
                        $scope.gioktNew = DataFactory.dsGio[giofixer];
                    }
            }
            $scope.searchData.giobd= $scope.giobdNew.value;
            $scope.searchData.giokt = $scope.gioktNew.value;
            $scope.data.giobd= $scope.giobdNew.name;
            $scope.data.giokt = $scope.gioktNew.name;   
            
            if($scope.KTGio() == false){
                alert("Giờ kết thúc phải lớn hơn giờ bắt đầu! ");
                return false;
            }
            
            if($scope.KTGioLe() == false){
                alert("Thời gian làm việc phải là 1h,2h,3h,..Không được lẻ! ");
                return false;
            }
            $scope.dataTimKiem = {
                gioBD: $scope.giobdNew.value,
                gioKT: $scope.gioktNew.value,
                quan: $scope.searchData.tenquan,
                dichvu: $scope.searchData.tendichvu,
                ngay: $scope.searchData.ngay
            }
            
            $scope.loading = true;
            
            $http.get('api/fixer?diachi.quan=' + $scope.dataTimKiem.quan)
            .success(function(data){
                for(var fixer=0;fixer < data.length;fixer++){
                    data[fixer].ngaysinh = new Date(data[fixer].ngaysinh);
                }
                $scope.ngvs = FixerFactory.filterFixerByServiceName(data, $scope.dataTimKiem.dichvu);
                
                $scope.filterLichBan($scope.ngvs);
            })
            .error(function(data){
                console.log('tim kiem Error');
            });
        }
        
         $scope.kiemtra = function(){
                if($scope.data.tendichvu == "" || $scope.data.tenquan=="" || $scope.data.giobd=="" || $scope.data.giokt==""  ){
                    return false;  
                }else{
                    return true;
                }
                    
            }
         
         $scope.KTGio = function(){
              $scope.searchData.giobd = parseInt($scope.searchData.giobd);
              $scope.searchData.giokt = parseInt($scope.searchData.giokt);
              if($scope.searchData.giobd >= $scope.searchData.giokt){
                  return false;
              }else{
                  return true;
              }
          }
         
         $scope.KTGioLe = function(){
             $scope.searchData.giobd = parseInt($scope.searchData.giobd);
              $scope.searchData.giokt = parseInt($scope.searchData.giokt);
              if((($scope.searchData.giokt - $scope.searchData.giobd)%60)==0){
                  return true;
              }else{
                  return false;
              }
         }
        
        $scope.filterLichBan = function(fixers){
            
            $http.post('api/timkiem/lichban', $scope.dataTimKiem)
            .success(function(dsLichBan){
                for(var i = 0; i < dsLichBan.length; i++) {
                    for(var j = 0; j < fixers.length; j++) {
                        if(dsLichBan[i].cmnd == fixers[j].cmnd) {
                            fixers.splice(j, 1);
                            j--;
                        }    
                    }
                }
                $scope.filterLichLamViec(fixers);
            })
            .error(function(data){
                console.log('tim kiem Error');
            });
            
        }
        
        $scope.filterLichLamViec = function(fixers){
            
            $http.post('api/timkiem/lichlamviec', $scope.dataTimKiem)
            .success(function(dsLichLV){
                for(var i = 0; i < dsLichLV.length; i++) {
                    for(var j = 0; j < fixers.length; j++) {
                        if(dsLichLV[i].cmnd == fixers[j].cmnd) {
                            fixers.splice(j, 1);
                            j--;
                        }    
                    }
                }
                $scope.loading = false;
            })
            .error(function(data){
                console.log('tim kiem Error');
            });
            
        }
        
        // CHI TIET NGUOI SUA CHUA
        $scope.show_detail = function(data){
            $scope.dsTuongDong =[];
            $scope.isDetail = true;
            $scope.isSearch = false;
            $scope.isDonHang = false; 
            $scope.ngscDcChon = data;
            for(var fixer=0;fixer < $scope.ngvs.length;fixer++){
                if($scope.ngvs[fixer].cmnd!= $scope.ngscDcChon.cmnd){
                    $scope.dsTuongDong.push($scope.ngvs[fixer]);
                }
            }
        }
        
        $scope.quayLaiSearchResult = function() {
            $scope.isDetail = false;
            $scope.isSearch = true;
            $scope.isDonHang = false;
        }
        
        // CHỌN NGƯỜI SỬA CHỮA
        $scope.fixerDcChon ={};
        $scope.chon_ngv = function(data){
            if ($scope.fixerDcChon.cmnd == data.cmnd) {
			    $('#'+$scope.fixerDcChon.cmnd).removeClass('bgcheckmark');
                $scope.fixerDcChon = {};
			}
			else{
                $scope.fixerDcChon = data;
                $('#'+$scope.fixerDcChon.cmnd).addClass('bgcheckmark');
        	}
            
            console.log($('#'+$scope.fixerDcChon.cmnd));
            
        }

        
        
        
        // YEU CẦU NGƯỜI SỬA CHỮA
        $scope.show_yeucau = function(){
            $scope.isSearch = false;
            $scope.isDetail = false;
           $scope.isDonHang = true;
            $scope.ngscDcChon = $scope.fixerDcChon;
                        

        }
        $scope.layDiaChi = function(){
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
        
        // LƯU YÊU CẦU
        $scope.data ={};
        
           $scope.luu_yeucau = function(){
               if($scope.taikhoanKH == undefined) {
                   $scope.taikhoanKH = $scope.data.sodt;
               }
               
//               $http.get("/api/getid")
//               .then(
//                function success(response){
//                    var mayc = response.data;
                    var dataYC = {
                      
                        ngaydatyeucau: new Date(),
                        accountKH : $scope.taikhoanKH,
                        quan : $scope.searchData.tenquan,
                        ngaylam : $scope.searchData.ngay,
                        trangthai : "Bắt đầu", 
                        hotenTho: $scope.ngscDcChon.hoten,
                        cmndTho : $scope.ngscDcChon.cmnd,
                        dichvuyc :  [$scope.searchData.tendichvu],
                        hotenKH : $scope.data.hotenKH,
                        sodt : $scope.data.sodt,
                        diachi : $scope.data.diachi,
                        mota : $scope.data.mota,
                        sdtTho : $scope.ngscDcChon.sodt,
                        giobatdau : $scope.giobdNew.value,
                        gioketthuc : $scope.gioktNew.value,
                        phidichvu : $scope.searchData.tongchiphi,
                        nhanxet: "",
                        email: "",
                    } 
                $http.post('/api/yeucau', dataYC)
                    .then(
                        function successCallback(response) {
                            var lichLamViec = {
                                cmnd : $scope.ngscDcChon.cmnd,
                                hotenKH : $scope.data.hotenKH,
//                                mayc : mayc,
                                ngay : $scope.searchData.ngay,
                                giobd : $scope.giobdNew.value,
                                giokt : $scope.gioktNew.value
                            }
                            $scope.luuLichLamViec(lichLamViec);
                          }, function errorCallback(response) {
                            alert("tao don hang that bai");
                            console.log(dataYC);
                            console.log(response);
                          });
                    
//                }, function error(err){
//                    alert("Get Ma DH error.");
//                }
               
//               );
               
        }
           
           
       $scope.luuLichLamViec = function(lichlamviec) {
           
           $http.post('/api/lichlamviec', lichlamviec)
                .then(function successCallback(response) {
                    alert("Bạn đã tạo đơn hàng thành công");
                    window.location.replace("/");
                  }, function errorCallback(response) {
                    alert("tao don hang that bai");
                    console.log(dataYC);
                    console.log(response);
                  });
            $scope.isDonHang = false;
            $scope.isSearch = true;
            $scope.isDetail = false;
       }
           
        
       // Hủy phần đặt yêu cầu
        $scope.close_thanhtoan = function(){
			
            $scope.isDonHang = false;
            $scope.isSearch = true;
            $scope.isDetail = false;
		}
        // TO DO : FILTER NGUOI SUA CHUA THEO GIO
    });
    
}());


