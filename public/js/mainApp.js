var app = angular.module('mainApp', ['mainRoutes', 'todoService', 'ngAnimate', 'toastr', 'ui.bootstrap']);

app.controller('mainController', ['$scope', '$http', 'toastr', 'TodoService', function($scope, $http, toastr, TodoService) {
    $scope.lists = [];
    $scope.completedTodos = [];
    $scope.allTodos = [];
    
    var initializeTodos = function() {
        TodoService.getActiveTodos().success(function (data) {
            $scope.lists = data;
            $scope.anyActiveTodos = $scope.lists.length;
            console.log($scope.lists);
        });
        TodoService.get().success(function(data) {
            $scope.allTodos = data;
        });
        TodoService.getAllCompletedTodos().success(function(data) {
            $scope.completedTodos = data;
            console.log('completed Todos',$scope.completedTodos);

        });
    }
    
    initializeTodos();

    $scope.addTodos = function() {
        var input = $scope.myinput;

        TodoService.add(input).success(function(data){
            $scope.myinput = "";
            toastr.success('agregado con exito!!','Success');
            $scope.anyActiveTodos = true;

            initializeTodos();
            $scope.lists.push({
                id: data.id,
                TodoName: input,
                IsDone : false
            });
        }).error(function(){
            toastr.error('MMM algo anda mal. Intente de nuevo mas tarde','Fail');
        });
    }
    $scope.done = function(list) {
        console.log('hecho');
        console.log(list);

        if (list.IsDone) {
            var todoIndex = $scope.lists.indexOf(list);

            TodoService.update(list.id,list.IsDone,list.TodoName).success(function() {
                $scope.anyActiveTodos = $scope.lists.length;

                initializeTodos();
                toastr.sucess('Se hizo un todo', 'Success');
            });
        }
    }    
}]);