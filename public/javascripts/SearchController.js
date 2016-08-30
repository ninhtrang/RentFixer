function externalValidateData(){
  return angular.element($("#formTheoNgay")).scope().Search();
}

(function(){
    var app = angular.module("RentFixer");
     app.controller("SearchController",function(DataFactory,$scope,$http){
         $scope.giobdNew ={};
        $scope.gioktNew = {};
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
                console.log($scope.data.giobd);
               if ( $scope.kiemtra() == false ){
                   alert("Vui lòng nhập đầy đủ thông tin trước khi tìm kiếm");
                   return false;
               }
                if($scope.KTGio() == false){
                    alert("Giờ kết thúc phải lớn hơn giờ bắt đầu! ");
                    return false;
                }else{
                   $timeout(function(){
				    $('#formTheoNgay').submit();
			        },300);
                   return false;
               }
			
		}
            // Ktra giobd co lon hon giokt ko
          $scope.KTGio = function(){
//              for(var giofixer = 0; giofixer < DataFactory.dsGio.length; giofixer++ ){
//                if(DataFactory.dsGio[giofixer].name == $scope.data.giobd)
//                    {
//                        $scope.giobdNew = DataFactory.dsGio[giofixer];
//                    }
//                if(DataFactory.dsGio[giofixer].name == $scope.data.giokt)
//                    {
//                        $scope.gioktNew = DataFactory.dsGio[giofixer];
//                    }
//            }
              if($scope.data.giobd >= $scope.data.giokt){
                  return false;
              }else{
                  return true;
              }
          }  
            

            // KIỂM TRA GIÁ TRỊ LÚC SEARCH
            $scope.kiemtra = function(){
                if($scope.data.tendichvu == "" || $scope.data.tenquan=="" || $scope.data.giobd=="" || $scope.data.giokt==""  ){
                    return false;  
                }else{
                    return true;
                }
                    
            }
            
            $scope.dsGio= DataFactory.dsGio;
            
    });
}());
