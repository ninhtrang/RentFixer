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
            
            // if giomoi va giocu, tim gia tri moi tuong ung, gan gio cu thanh gio moi
            if(($scope.searchData.giobd !=$scope.data.giobd) ||($scope.searchData.giokt !=$scope.data.giokt)){
                 for(var giofixer = 0; giofixer < DataFactory.dsGio.length; giofixer++ ){
                    if(DataFactory.dsGio[giofixer].name == $scope.data.giobd) {
                            $scope.giobdNew = DataFactory.dsGio[giofixer];
                        }
                    if(DataFactory.dsGio[giofixer].name == $scope.data.giokt) {
                            $scope.gioktNew = DataFactory.dsGio[giofixer];
                        }
                }
                $scope.searchData.giobd= $scope.giobdNew.name;
                $scope.searchData.giokt = $scope.gioktNew.name;
                $scope.data.giobd= $scope.giobdNew.name;
                $scope.data.giokt = $scope.gioktNew.name;   
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
                console.log('tim ddddddd222222222');
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
        
        
        // LƯU YÊU CẦU
        $scope.data ={};
        
           $scope.luu_yeucau = function(){
               
               $http.get("/api/getid")
               .then(
                function success(response){
                    var mayc = response.data;
                    var dataYC = {
                        mayc: "YC199",
                        ngaydatyeucau: new Date(),
                        accountKH : "aaaa",//$scope.taikhoanKH,
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
                        giobatdau : $scope.giobdNew.name,
                        gioketthuc : $scope.gioktNew.name,
                        phidichvu : $scope.searchData.tongchiphi,
                        nhanxet: "",
                        email: "",
                    } 
                $http.post('/api/yeucau', dataYC)
                    .then(
                        function successCallback(response) {
                            data={};
                            alert("Bạn đã tạo đơn hàng thành công");
                          }, function errorCallback(response) {
                           alert("that bai");
                              console.log(dataYC);
                              console.log(response);
                          });
                $scope.isDonHang = false;
                $scope.isSearch = true;
                $scope.isDetail = false;
                    
                }, function error(err){
                    alert("Get Ma DH error.");
                }
               
               );
               
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


