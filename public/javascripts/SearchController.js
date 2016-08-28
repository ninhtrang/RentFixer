function externalValidateData(){
  return angular.element($("#formTheoNgay")).scope().Search();
}

(function(){
    var app = angular.module("RentFixer");
     app.controller("SearchController",function(DataFactory,$scope,$http){
        $scope.data={
            tenquan: "",
            tendichvu:"",
            giobd:"",
            giokt:""
        };
         $scope.validateData = false;
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
            $scope.Search = function(){
               if ( $scope.kiemtra() == false ){
                   alert("Vui lòng nhập đầy đủ thông tin trước khi tìm kiếm");
                   return false;
               }else{
                   $timeout(function(){
				    $('#formTheoNgay').submit();
			        },300);
                   return false;
               }
			
		}

            // KIỂM TRA GIÁ TRỊ LÚC SEARCH
            $scope.kiemtra = function(){
                if($scope.data.tendichvu == "" || $scope.data.tenquan=="" || $scope.data.giobd=="" || $scope.data.giokt=="" ){
                    return false;  
                }else{
                    return true;
                }
                    
            }
            
            $scope.dsGio= DataFactory.dsGio;
            
    });
}());
