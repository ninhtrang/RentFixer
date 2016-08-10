(function(){
    var app = angular.module("RentFixer");
    app.factory('FixerFactory',function(){
        var service = {};
        
        service.filterFixerByServiceName = function(fixerList, serviceName){
            var result = [];
            for(var fixerIndex = 0; fixerIndex < fixerList.length; fixerIndex++){
                var fixer = fixerList[fixerIndex];
                for(var serviceIndex = 0; serviceIndex < fixer.sotruong.length; serviceIndex++){
                    var service = fixer.sotruong[serviceIndex];
                    if(service.toLowerCase() == serviceName.toLowerCase()){
                        result.push(fixer);
                        break;
                    }
                }
            }
            return result;
        }
        return service;
        
        
    });
        
    
}());