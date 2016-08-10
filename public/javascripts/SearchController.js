(function(){
    var app = angular.module("RentFixer");
     app.controller("SearchController",function(DataFactory,$scope,$http){
        $scope.data={
            tenquan: "",
            tendichvu:"",
            giobd:"",
            giokt:""
        };
        $scope.dsQuan = [];
         $http.get('api/quan')
            .success(function(data) {
                $scope.dsQuan = data;
                console.log($scope.dsQuan);
            })
            .error(function(data) {
                console.log('Error ' );
            });
        $scope.dsDichvu = [];
        $http.get('api/dichvu')
            .success(function(data) {
                $scope.dsDichvu = data;
                console.log($scope.dsDichvu);
            })
            .error(function(data) {
                console.log('Error ' );
            });
         
//         $scope.Search = function(){
//            console.log($scope.data.tenquan);
//             console.log($scope.data.tendichvu);
//         }
            $scope.Search = function(){
			$timeout(function(){
				$('#formTheoNgay').submit();
			},300);
		}

            $scope.dsGio= DataFactory.dsGio;
            
    });
}());
