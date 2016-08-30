(function(){
    var app = angular.module("RentFixer");
    app.controller("FixerDetailController",function($scope,$http,DataFactory,AccountFactory){
        var idngv;
        $scope.ngvDcChon = {};
        $scope.loading = true;
        $scope.taikhoanKH = AccountFactory.getTaiKhoan();
        $scope.initData = function(id){
       
            idngv = id;
            $http.get('api/fixer?cmnd='+idngv)
            .success(function(data){
                console.log(data);
                $scope.loading = false;
                data[0].ngaysinh = new Date(data[0].ngaysinh);
                $scope.ngvDcChon = data[0];
            })
            .error(function(data){
                console.log('Error ');
            });
        }



    });
    


//


 
}());

