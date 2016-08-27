var app = angular.module("demo1", []);
    app.controller("FixerListController", function ($scope, $http) {
        $scope.data = {
//                cmnd : "sfdd",
//                hoten : "dung",
//                quequan : "tb",
//                sodt : 145678,
//                hinhanh : "gjg",
//                luong : 32,
//                quyenhethong : 1,
//                email : "dfjkf"
//            
//                cmnd : {type: Number, unique: true},
//                hoten : String,
//                ngaysinh : Date,
//                sodt : Number,
//                quequan : String,
//                quan : String,
//                sotruong:[],
//                sonamkinhnghiem : Number,
//                motakinhnghiem : String,
//                hinhanh : String,
//                luong : Number,
//                danhgia : String,
//                email : String
            
        }
        
        $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/fixer', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
    });

app.controller("AccountController", function($scope,$http){
   $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/account', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
});

app.controller("DichVuController", function($scope,$http){
   $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/dichvu', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
});

app.controller("KhachHangController", function($scope,$http){
   $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/khachhang', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
});

app.controller("QuanController", function($scope,$http){
   $scope.data = {
       
   } 
           $scope.test = function(){
            alert("ssss");
            
            $http.post('/api/quan', $scope.data)
                .then(
                    function successCallback(response) {
                        $scope.data={};
                        alert("thanh cong");
                      }, function errorCallback(response) {
                       alert("that bai");
                      })
        }
});


router.get('/getid', function(req, res, next) {
	yeucaumodel.find({}, function(err, data) {
		if(err){
			res.send(err);
		}
		if(data.length === 0){
			res.send('YC001');
		}else {
			var lastID = data.slice(-1).pop().mayc;
			var index =  parseInt(lastID.substring(2));
			index = index + 1;
			if(index<10){
				res.send("YC00"+index);
			}else if (index<100) {
				res.send("YC0"+index);
			}else if(index < 1000){
				res.send("YC"+index);
			}
		}
	})
})