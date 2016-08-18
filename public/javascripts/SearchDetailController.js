(function(){
    var app = angular.module("RentFixer");
    app.controller("SearchDetailController",function(FixerFactory,DataFactory, $scope,$http,$timeout){
       
        $scope.loading = true;
        $scope.isDetail = false;
        $scope.ngscDcChon = {};
        
        $scope.searchData = {
          tenquan: "",
          tendichvu: "",
          ngay: "",
          giobd: "",
          giokt: ""
        };
        $scope.ngvs = [];
        $scope.initDataFirstTime = function(tenquan,tendichvu,ngay,giobd,giokt){
              $scope.searchData.tenquan = tenquan;
              $scope.searchData.tendichvu= tendichvu;
              $scope.searchData.ngay= ngay;
              $scope.searchData.giobd= giobd;
              $scope.searchData.giokt = giokt;
        // FILTER QUAN VA DICH VU  

         $scope.Search();
        //LAY DANH SACH QUAN
            
        $scope.quans = [];
         $http.get('api/quan')
            .success(function(data) {
                $scope.quans = data;
                console.log($scope.quans);
            })
            .error(function(data) {
                console.log('Error ' );
            });
            
        // LAY DANH SACH DICH VU
            
        $scope.dichvus = [];
        $http.get('api/dichvu')
            .success(function(data) {
                $scope.dichvus = data;
                console.log($scope.dichvus);
            })
            .error(function(data) {
                console.log('Error ' );
            });
        // LAY DANH SACH GIO
            
          $scope.dsGio = DataFactory.dsGio;
            
            
        }
        
        
        $scope.Search = function(){
            $scope.loading = true;
            $http.get('api/fixer?diachi.quan='+$scope.searchData.tenquan)
            .success(function(data){
                $scope.ngvs = FixerFactory.filterFixerByServiceName(data, $scope.searchData.tendichvu);
                 console.log($scope.ngvs);
                console.log('call search');
                $scope.loading = false;
            })
            .error(function(data){
                console.log('Error ');
            });
        }
        
        // CHI TIET NGUOI SUA CHUA
        $scope.show_detail = function(data){
            $scope.isDetail = true;
            $scope.ngscDcChon = data;
            console.log(data);
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

        
        // TO DO : FILTER NGUOI SUA CHUA THEO GIO
    });
    
}());

