(function(){
    var app = angular.module("RentFixer");
    app.controller("FixerDetailController",function($scope,$http,DataFactory,AccountFactory,FixerFactory){
        var idngv;
        $scope.ngvDcChon = {};
        $scope.loading = true;
        $scope.dsTuongDong =[];
        $scope.taikhoanKH = AccountFactory.getTaiKhoan();
        
//                 $http.get('api/fixer')
 //           .success(function(data) {
 //               console.log(data);
  //              $scope.loadingSlick = false;
 //            for(var fixer=0;fixer < data.length;fixer++){
  //               data[fixer].ngaysinh = new Date(data[fixer].ngaysinh);
//             }
 //               $scope.ngvs = data;
 //           })
  //          .error(function(data) {
 //               console.log('Error ' );
  //          });
  //      
        $scope.initData = function(id){
       
            idngv = id;
            $http.get('api/fixer?cmnd='+idngv)
            .success(function(data){
                $scope.dsTuongDong =[];
                console.log(data);
                $scope.loading = false;
                data[0].ngaysinh = new Date(data[0].ngaysinh);
                $scope.ngvDcChon = data[0];
                
                
                 $http.get('api/fixer?diachi.quan='+$scope.ngvDcChon.diachi.quan)
                .success(function(data){
                     for(var fixer=0;fixer < data.length;fixer++){
                         data[fixer].ngaysinh = new Date(data[fixer].ngaysinh);
                     }
                    $scope.ngvs = FixerFactory.filterFixerByServiceName(data, $scope.ngvDcChon.sotruong[0]);
                    console.log($scope.ngvs);
                    $scope.loading = false;
                     
                    $scope.show_detail($scope.ngvDcChon);
                     
                })
                .error(function(data){
                    console.log('Error ');
                });
            })
            .error(function(data){
                console.log('Error ');
            });
            
        }
        
        $scope.show_detail = function(data){
            $scope.dsTuongDong =[];
            $scope.ngvDcChon = data;
            for(var fixer=0;fixer < $scope.ngvs.length;fixer++){
                if($scope.ngvs[fixer].cmnd!= $scope.ngvDcChon.cmnd){
                    $scope.dsTuongDong.push($scope.ngvs[fixer]);
                }
            }
        }
       

    });
    
//
 
}());

