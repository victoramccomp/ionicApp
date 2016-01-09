var app = angular.module('ada')

.controller('listaAlunosCtrl', function ($scope, $ionicPlatform, $cordovaSQLite) {

	$scope.alunos = [];

	$ionicPlatform.ready(function () {
		var db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
		var query = "select * from tb_aluno;";
		$cordovaSQLite.execute(db, query, []).then(function (result) {
			for (var i = 0; i < result.rows.length; i++) {
				$scope.alunos.push({
					//valores
				});
			}

		}, function (error) {
			console.log(error);
		})
	});

	$scope.showPopupOpcoes = function () {
		$ionicPopup.show({
			scope: $scope,
			buttons: [
			  {
				  text: 'Novo',
				  type: 'button-balanced ion-android-create', // icon-left ion-android-create
				  onTap: function () {
					  //abrir edição do aluno - passar parametro
				  }
			  },
			  {
				  text: 'Editar Tipo',
				  type: 'button-assertive ion-android-delete', // icon-left ion-android-create
				  onTap: function () {
					  //deletar aluno - passar parametro
				  }
			  }
			]
		});
	}

})