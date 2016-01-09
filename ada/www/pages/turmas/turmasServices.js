var app = angular.module('ada');

app.factory('crudTurmas', ['$cordovaSQLite', function ($cordovaSQLite) {
    var _turmas = [];
    var _db = window.openDatabase("ada.db", "1.1", "ADA", 200000);

    var _readTurmas = function () {
                         
                         return $cordovaSQLite.execute(_db, turmasQueries.readTurmas, []).then(function (result) {
                                 for (var i = 0; i < result.rows.length; i++) {
                                     _turmas.push({
                                         cod_turma: result.rows[i].cod_turma,
                                         descricao_turma: result.rows[i].descricao_turma,
                                         desc_turma: result.rows[i].desc_turma
                                     });
                                 }

                         return _turmas;

                         })
    }

    var _readTurmaPorCodigo = function (cod_turma) {
                         var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
                         //var query = "select cod_turma, descricao_turma, desc_turma from tb_turma where cod_turma = ;" + cod_turma;
                         return $cordovaSQLite.execute(db, query, [cod_turma]).then(function (result) {
                             for (var i = 0; i < result.rows.length; i++) {
                                 _turmas.push({
                                     cod_turma: result.rows[i].cod_turma,
                                     descricao_turma: result.rows[i].descricao_turma,
                                     desc_turma: result.rows[i].desc_turma
                                 });
                             }
                         
                             return _turmas;
                         
                         })
    }

    var _deleteTurmaPorCodigo = function (cod_turma) {
                        var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
                        var query = "delete from tb_turma where cod_turma = ;" + cod_turma;
                        return $cordovaSQLite.execute(db, query, []).then(function (result) {
                           
                        })
    }

    var _updateTurmaPorCodigo = function (cod_turma, descricao_turma, desc_turma) {
                        var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
                        var query = "update tb_turma " +
                                    "set descricao_turma = " + descricao_turma + "," +
                                    "desc_turma = " + desc_turma +
                                    "where cod_turma = ;" + cod_turma;
                        return $cordovaSQLite.execute(db, query, []).then(function (result) {

                        })
    }


    return {
        turmas: _turmas,
        readTurmas: _readTurmas,
        readTurmaPorCodigo: _readTurmaPorCodigo,
        deleteTurmaPorCodigo: _deleteTurmaPorCodigo,
        updateTurmaPorCodigo: _updateTurmaPorCodigo
    }
    

}]);