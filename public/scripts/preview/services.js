

/* Services */

angular.module('appServices', [])
        //esto se queda, pero solo como adorno para futuras referencias
        .factory('Page', function($rootScope){
            var pageTitle = "Untitled";
            return {
                title:function(){
                    return pageTitle;
                },
                setTitle:function(newTitle){
                    pageTitle = newTitle;
                }
            }
        })

        .factory ('Model', ['$http',function ($http) {           
            var data = [
                {id:0, title:'Doh', detail:"A dear. A female dear."},
                {id:1, title:'Re', detail:"A drop of golden sun."},
                {id:2, title:'Me', detail:"A name I call myself."},
                {id:3, title:'Fa', detail:"A long, long way to run."},
                {id:4, title:'So', detail:"A needle pulling thread."},
                {id:5, title:'La', detail:"A note to follow So."},
                {id:6, title:'Tee', detail:"A drink with jam and bread."}
            ];
            
            return {
                notes:function () {
                    return data;
                },
                get:function(id){
                  return data[id];
                },
                add:function (note) {
                    var currentIndex = data.length;
                    data.push({
                        id:currentIndex, title:note.title, detail:note.detail
                    });
                },
                delete:function (id) {
                    var oldNotes = data;
                    data = [];
                    angular.forEach(oldNotes, function (note) {
                        if (note.id !== id) data.push(note);
                    });
                }
            }
}]).factory ('Seccion', ['$http',function ($http) {                       
            var secciones = [];
            
            return {
                secciones:function (pagina_id,callback) {
                    $http.get('/api/pagina/'+pagina_id+'/secciones').success(function (data,status,headers,config) {
                        // return data;
                        callback(null,data);
                     });
                },
                bloques:function (seccion_id,callback) {
                    $http.get('/api/seccion/'+seccion_id).success(function (data,status,headers,config) {
                        callback(null,data);
                     }).error(function(){
                        alert('Hubo un error!');
                     });
                },
                get:function(id){
                  return data[id];
                },
                add:function (note) {
                    var currentIndex = data.length;
                    data.push({
                        id:currentIndex, title:note.title, detail:note.detail
                    });
                },
                delete:function (id) {
                    var oldNotes = data;
                    data = [];
                    angular.forEach(oldNotes, function (note) {
                        if (note.id !== id) data.push(note);
                    });
                }
            }
}]).factory ('Pagina', ['$http',function ($http) {                       
            var secciones = [];
            
            return {
                settings:function (pagina_id,callback) {
                    $http.get('/api/pagina/'+pagina_id).success(function (data,status,headers,config) {
                        // return data;
                        callback(null,data);
                     });
                },
                get:function(id){
                  return data[id];
                },
                add:function (note) {
                    var currentIndex = data.length;
                    data.push({
                        id:currentIndex, title:note.title, detail:note.detail
                    });
                },
                delete:function (id) {
                    var oldNotes = data;
                    data = [];
                    angular.forEach(oldNotes, function (note) {
                        if (note.id !== id) data.push(note);
                    });
                }
            }
}]);
