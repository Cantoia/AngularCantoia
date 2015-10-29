'use strict';

'use strict';

/**
 * @ngdoc function
 * @name angularDashboardApp.controller:ProveedoresCtrl
 * @description
 * # ProveedoresCtrl
 * Controller of the angularDashboardApp
 */
angular.module('angularDashboardApp')
  .controller('ProveedoresCtrl',['$scope','$http','$rootScope','toaster','uiGridConstants', 
    function($scope, $http, $rootScope,toaster, uiGridConstants){
        
        console.log("cargo proveedores controller");
        $scope.proveedores = [];


           // $scope.fecha = moment();
        
        $scope.gridOp= {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter:true
        }
                // Para eliminar multiples
                  
$scope.gridOp.onRegisterApi = function (gridApi) {
     $scope.gridApi = gridApi;
}
        $scope.cargarProveedores = function(prov) {
            $http.post($rootScope.config.service_url+'proveedores', {
                nombre: prov.nombre.$modelValue,
                apellido: prov.apellido.$modelValue,
                email: prov.mail.$modelValue,
                dir: prov.dir.$modelValue
            })
            .success(function(res){
                toaster.pop('success', prov.nombre.$modelValue, "agregado");
                $scope.listarProveedores();
                $('#myModal1').modal('hide');
                });
        }


        $scope.idProveedorBorrar = '';

        $scope.confirmarBorrarProveedor = function() {
            var objs = $scope.gridApi.selection.getSelectedRows();
            $scope.ids = [];
            angular.forEach(objs, function(obj){
                $scope.ids.push(obj.id);
            });
        }

        $scope.borrarProveedor = function() {
            angular.forEach($scope.ids, function(id){
                $http.delete($rootScope.config.service_url+'proveedores/'+id)
                .success(function(res){
                toaster.pop('success', "Proveedor Eliminado");
            });
            });
                $scope.listarProveedores();
                $('#myModal').modal('hide');
        }

        $scope.listarProveedores = function(){
            $scope.proveedores = [];
            $http.get($rootScope.config.service_url+'proveedores').then(function(res){
                console.log("success!", res);
                var pvs = res.data;
                angular.forEach(pvs, function (p){
                    var prov = {};
                    prov.id = p.id;
                    prov.nombre=p.nombre;
                    prov.apellido=p.apellido;
                    prov.email=p.email;
                    prov.dir=p.dir;
                    $scope.proveedores.push(prov);
                });
            }, function(){
                console.log("error!");
            });

            $scope.gridOp.data = $scope.proveedores;
        }

        $scope.listarProveedores();
  }]);
