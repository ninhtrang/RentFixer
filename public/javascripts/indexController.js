var app = angular.module("RentFixer",[]);
app.controller("FixerListController",function($scope,$http){
    $scope.dsFixer = [];
    $scope.loadingSlick = true;
     $http.get('http://localhost:3000/api/fixer')
        .success(function(data) {
            console.log(data);
            $scope.loadingSlick = false;
            $scope.dsFixer = data;
        })
        .error(function(data) {
            console.log('Error ' );
        });
    
    var s = '?cmnd=22222222222';
    $http.get('http://localhost:3000/api/fixer'+s)
    .success(function(data){
        console.log(data);
    })
    .error(function(data){
        console.log('Error ');
    });
    $scope.xemChiTietNgv = function(cmnd){
			$scope.cmnd = cmnd;
			$timeout(function(){
				$('#xemchitietngvform').submit();
			},300);
		}

});
app.controller("SearchController",function($scope,$http){
//    [
//        {
//            name: "08:00",
//            value: 480
//        },
//        
//    ]
    
    $scope.dsQuan = [];
     $http.get('http://localhost:3000/api/quan')
        .success(function(data) {
            $scope.dsQuan = data;
            console.log($scope.dsQuan);
        })
        .error(function(data) {
            console.log('Error ' );
        });
    $scope.dsDichvu = [];
    $http.get('http://localhost:3000/api/dichvu')
        .success(function(data) {
            $scope.dsDichvu = data;
            console.log($scope.dsDichvu);
        })
        .error(function(data) {
            console.log('Error ' );
        });
    
    $scope.dsGio = [
        {
            name: "6:00 giờ",
            value: 360
        },
        {
            name: "6:30 giờ",
            value: 390
        },       
        {
            name: "7:00 giờ",
            value: 420
        },       
        {
            name: "7:30 giờ",
            value: 450
        },       
        {
            name: "8:00 giờ",
            value: 480
        },       
        {
            name: "8:30 giờ",
            value: 510
        },        
        {
            name: "9:00 giờ",
            value: 540
        },        
        {
            name: "9:30 giờ",
            value: 570
        },        
        {
            name: "10:00 giờ",
            value: 600
        },        {
            name: "10:30 giờ",
            value: 630
        },        {
            name: "11:00 giờ",
            value: 660
        },        {
            name: "11:30 giờ",
            value: 690
        },        {
            name: "12:00 giờ",
            value: 720
        },        {
            name: "12:30 giờ",
            value: 750
        },        {
            name: "13:00 giờ",
            value: 780
        },        {
            name: "13:30 giờ",
            value: 810
        },        {
            name: "14:00 giờ",
            value: 840
        },        {
            name: "14:30 giờ",
            value: 870
        },        {
            name: "15:00 giờ",
            value: 900
        },        {
            name: "15:30 giờ",
            value: 930
        },        {
            name: "16:00 giờ",
            value: 960
        },        {
            name: "16:30 giờ",
            value: 990
        },        {
            name: "17:00 giờ",
            value: 1020
        },        {
            name: "17:30 giờ",
            value: 1050
        },        {
            name: "18:00 giờ",
            value: 1080
        },        {
            name: "18:30 giờ",
            value: 1110
        },        {
            name: "19:00 giờ",
            value: 1140
        },        {
            name: "19:30 giờ",
            value: 1170
        },        {
            name: "20:00 giờ",
            value: 1200
        }
    ];
});