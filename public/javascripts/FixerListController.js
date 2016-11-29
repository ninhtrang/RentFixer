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
             for(var fixer=0;fixer < data.length;fixer++){
                 data[fixer].ngaysinh = new Date(data[fixer].ngaysinh);
             }
                $scope.dsFixer = data;
            })
            .error(function(data) {
                console.log('Error ' );
            });
     
//        // khach hang
//        $http.get('api/khachhang')
//            .success(function(data) {
//                console.log(data);
//                $scope.loadingSlick = false;
//           
//                $scope.dsKH = data;
//            })
//            .error(function(data) {
//                console.log('Error ' );
//            });
        
        // TO DO : UPDATE FIXER INFO(NGAYSINH - TUOI)

        
        $scope.xemChiTietFixer = function(id){
			$scope.cmnd = id;
            console.log($scope.cmnd);
			$timeout(function(){
				$('#xemchitietfixerform').submit();
			},300);
		}
    

    });
    
   
 
    
}());


