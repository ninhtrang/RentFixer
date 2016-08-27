(function(){
    var app = angular.module("RentFixer");
    app.factory('AccountFactory',function($cookies){
        var service = {};
        
        service.setAccountToCookie = function(taikhoan, password){
            $cookies.put("taikhoan", taikhoan);
            $cookies.put("password", password);
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
        return service;
        
        
    });
        
    
}());