(function(){
    var app = angular.module("RentFixer");
    app.factory('AccountFactory',function($cookies, $http, $q){
        var service = {};
        
        service.setAccountToCookie = function(taikhoan, password,hoten){
            $cookies.put("taikhoan", taikhoan);
            $cookies.put("password", password);
            $cookies.put("hoten",hoten);
        }
        
        service.checkCookie = function(){
            var taikhoan = $cookies.get("taikhoan");
            if(taikhoan != undefined || taikhoan!= null){
                return true;
            }
            return false;
        }
        service.getTaiKhoan = function(){
            var taikhoan = $cookies.get("taikhoan");
            
            return taikhoan;
        }
        
        service.getHoTen = function(){
            var hoten = $cookies.get("hoten");
            return hoten;
        }
        service.layDiaChiGoogleMapApi = function(lat, lng){
			var deferred = $q.defer();
			var toado = {
				lat: lat,
				lng: lng
			}
			$http.post('/get_address', toado)
		        .success(function(data) {
	        		deferred.resolve(data);
		        }).error(function(data) {
		            console.log('Error: ' + data);
        		});
		    return deferred.promise;
		}
        
        return service;
        
        
    });
        
    
}());