(function(){
    var app = angular.module("RentFixer");
    app.controller("KhachHangController",function($scope,$http){
        $scope.dsKH = [];

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
        
         $http.get('api/khachhang')
            .success(function(data) {
                console.log(data);
                $scope.dsKH = data;
            })
            .error(function(data) {
                console.log('Error ' );
            });


    });
    
}());

