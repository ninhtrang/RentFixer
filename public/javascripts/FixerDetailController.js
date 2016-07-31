(function(){
    var app = angular.module("RentFixer");
    app.controller("FixerDetailController",function($scope,$http){
        var idngv;
        $scope.ngvDcChon = {};
        $scope.loading = true;
        $scope.initData = function(id){
            idngv = id;
            $http.get('api/fixer?cmnd='+idngv)
            .success(function(data){
                console.log(data);
                $scope.loading = false;
                $scope.ngvDcChon = data[0];
            })
            .error(function(data){
                console.log('Error ');
            });
        }



    });
    
}());

