angular.module('myApp', [])
.controller('ServicesCtrl',
    function($scope,$http){
      console.log("yeah it is me from controler");


      $scope.create= function(){
         console.log($scope.serviceClient);
         //create database record.. insert
         $http.post("/serviceClients", $scope.serviceClient)
         .success(function(response){
                   $scope.all(); 
                 });
         
      }


       //delete
       $scope.remove= function(id){
           $http.delete("/serviceClients/"+id)
           .success(function(response){
                   $scope.all(); 
                });
        }
       

       //select 
       $scope.select = function(id){
       console.log(id);
       $http.get("/serviceClients/"+id)
       .success(function(response){
             console.log(response);
             $scope.serviceClient= response;
             });
       };

       //update

      $scope.update=function(){
        console.log($scope.serviceClient);
        $http.put("/serviceClients/"+$scope.serviceClient._id, $scope.serviceClient)    
           .success(function(response){
                   $scope.all(); 
                });
      

      }
      

      // get all from database..backend server
     // define value to house data from restful
      var renderServiceClients = function(response){
        //set scope var to response from server
        $scope.services=response;
        };
      // do the http get route 
      $scope.all = function(){
         $http.get("/serviceClients")
         .success(renderServiceClients);
      }
     
     $scope.all();

  
});

