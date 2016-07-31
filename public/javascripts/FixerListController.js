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

//        var s = '?cmnd=22222222222';
//        $http.get('api/fixer'+s)
//        .success(function(data){
//            console.log(data);
//        })
//        .error(function(data){
//            console.log('Error ');
//        });
        
        $scope.xemChiTietFixer = function(id){
			$scope.cmnd = id;
            console.log($scope.cmnd);
			$timeout(function(){
				$('#xemchitietfixerform').submit();
			},300);
		}

    });
    
}());


