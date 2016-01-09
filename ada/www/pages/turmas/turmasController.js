var app = angular.module('ada')

.controller('listaTurmasCtrl', function ($scope, $ionicPlatform, $cordovaSQLite, $ionicPopup, $controller, crudTurmas) {

	$scope.turmas = [];

	$ionicPlatform.ready(function () {

	    crudTurmas.readTurmas().then(function (dataResponse) {
	        $scope.turmas = dataResponse;

	    });

	});

	$scope.showPopupAcaoTurma = function () {

		var goController = $scope.$new();
		var deleteController = $scope.$new();

		$ionicPopup.show({
			scope: $scope,
			buttons: [
			  {
				  text: 'Editar',
				  type: 'button-balanced ion-android-create', // icon-left ion-android-create
				  onTap: function () {
					  $controller('goCtrl', { $scope: goController });
					  goController.go("/turmas/cadastro_turmas");
				  }
			  },
			  {
				  text: 'Visualizar',
				  type: 'button-positive ion-ios-eye', // icon-left ion-android-create
				  onTap: function () {
					  $controller('', { $scope: goController });
					  goController.go("/turmas/cadastro_turmas");
				  }
			  },
			  {
				  text: 'Excluir',
				  type: 'button-assertive ion-android-delete', // icon-left ion-android-create
				  onTap: function () {
					  $controller('crudTurmasCtrl', { $scope: deleteController });
					  goController.delete("/turmas/cadastro_turmas");
				  }
			  }
			]
		});
	}

})

.controller('cadastroTurmasCtrl', function ($scope, $cordovaSQLite, $ionicPopup) {

	$scope.turmas = [];

	$ionicPlatform.ready(function (estadoTela) {

		if (estadoTela == "v" || estadoTela == "u") {
			var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
			var query = "select cod_turma, descricao_turma, desc_turma from tb_turma where cod_turma = " + cod_turma + ";";
			$cordovaSQLite.execute(db, query, []).then(function (result) {
				for (var i = 0; i < result.rows.length; i++) {
					$scope.turmas.push({
						cod_turma: result.rows[i].cod_turma,
						descricao_turma: result.rows[i].descricao_turma,
						desc_turma: result.rows[i].desc_turma
					});
				}

			}, function (error) {
				$ionicPopup.alert({
					title: 'Turma',
					template: 'Dados não recuperados!'
				});
			})
		}

	});

})

.controller('crudTurmasCtrl', function ($scope, $cordovaSQLite, $ionicPopup) {

	$scope.turmas = [];

	$scope.insert = function (dados) {

		var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
		var query = "insert into tb_turma values (select max(cod_turma) + 1 from tb_turma, descricao_turma, desc_turma);";
		$cordovaSQLite.execute(db, query, []).then(function (result) {
			$ionicPopup.alert({
				title: 'Turma',
				template: 'Turma cadastrada!'
			});
		}, function (error) {
			$ionicPopup.alert({
				title: 'Turma',
				template: 'Turma não cadastrada!'
			});
		})

	}

	$scope.update = function (dados) {
		$ionicPlatform.ready(function () {
			var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
			var query = "update tb_turma" +
						"set descricao_turma = " + descricao_turma + "," +
						"set desc_turma = " + desc_turma +
						"where cod_turma = " + cod_turma + ";";
			$cordovaSQLite.execute(db, query, []).then(function (result) {
				$ionicPopup.alert({
					title: 'Turma',
					template: 'Dados atualizados!'
				});

			}, function (error) {
				$ionicPopup.alert({
					title: 'Turma',
					template: 'Dados não atualizados!'
				});
			})
		});
	}

	$scope.delete = function (cod_turma) {
		$ionicPlatform.ready(function () {
			var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
			var query = "delete from tb_turma where cod_turma = " + cod_turma + ";";
			$cordovaSQLite.execute(db, query, []).then(function (result) {
				$ionicPopup.alert({
					title: 'Turma',
					template: 'Turma excluída!'
				});

			}, function (error) {
				$ionicPopup.alert({
					title: 'Turma',
					template: 'Turma não excluída!'
				});
			})
		});
	}

})