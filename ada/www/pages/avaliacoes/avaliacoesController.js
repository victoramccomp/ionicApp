var app = angular.module('ada')

.controller('listaAvaliacoesCtrl', function ($scope, $ionicPlatform, $cordovaSQLite) {
	$scope.showPopup = function () {
		$ionicPopup.show({
			scope: $scope,
			buttons: [
			  {
				  text: 'Editar',
				  type: 'button-balanced ion-android-create', // icon-left ion-android-create
				  onTap: function () {
					  //abrir edição do aluno - passar parametro
				  }
			  },
			  {
				  text: 'Excluir',
				  type: 'button-assertive ion-android-delete', // icon-left ion-android-create
				  onTap: function () {
					  //deletar aluno - passar parametro
				  }
			  }
			]
		});
	}
})