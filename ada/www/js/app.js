var db = null;

var app = angular.module('ada', ['ionic', 'ngCordova'])

//Inicializa��o do cordova e da BASE
.run(function($ionicPlatform,$cordovaSQLite) {
	$ionicPlatform.ready(function () {
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			//cordova.plugins.Keyboard.disableScroll(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}

		//usar s� com o emulador
		// db = $cordovaSQLite.openDB("ada.db");
		db = window.openDatabase("ada.db", "1.1", "ADA", 200000);
		//db.changeVersion("1.0", "1.1", createADADatabase($cordovaSQLite, db));
		//insertData(db);
		//createADADatabase($cordovaSQLite, db);
	});
})

//ROTAS
.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('home', {
		url: "/home",
		templateUrl: "pages/home.html",
	})

	.state('lista_alunos', {
		url: "/alunos/lista_alunos",
		templateUrl: "pages/alunos/lista_alunos.html",
	})

	.state('cadastro_alunos', {
		url: "/alunos/cadastro_alunos",
		templateUrl: "pages/alunos/cadastro_alunos.html",
	})

	.state('lista_avaliacoes', {
		url: "/avaliacoes/lista_avaliacoes",
		templateUrl: "pages/avaliacoes/lista_avaliacoes.html",
		controller: "listaAvaliacoesCtrl"
	})

	.state('cadastro_avaliacoes', {
		url: "/avaliacoes/cadastro_avaliacoes",
		templateUrl: "pages/avaliacoes/cadastro_avaliacoes.html",
	})

	.state('lista_disciplinas', {
		url: "/disciplinas/lista_disciplinas",
		templateUrl: "pages/disciplinas/lista_disciplinas.html",
	})

	.state('cadastro_disciplina', {
		url: "/disciplinas/cadastro_disciplina",
		templateUrl: "pages/disciplinas/cadastro_disciplina.html",
	})

	.state('lista_responsaveis', {
		url: "/responsaveis/lista_responsaveis",
		templateUrl: "pages/responsaveis/lista_responsaveis.html",
	})

	.state('cadastro_responsaveis', {
		url: "/responsaveis/cadastro_responsaveis",
		templateUrl: "pages/responsaveis/cadastro_responsaveis.html",
	})

	.state('lista_turmas', {
		url: "/turmas/lista_turmas",
		templateUrl: "pages/turmas/lista_turmas.html",
		controller: "listaTurmasCtrl"
	})

	.state('cadastro_turmas', {
		url: "/turmas/cadastro_turmas",
		templateUrl: "pages/turmas/cadastro_turmas.html",
	})

	.state('configuracoes', {
		url: "/configuracoes/configuracoes",
		templateUrl: "pages/configuracoes/configuracoes.html",
	})

	.state('adiciona_conceito', {
	    url: "/configuracoes/adiciona_conceito",
	    templateUrl: "pages/configuracoes/adiciona_conceito.html",
	})

	.state('configurar_tipo_avaliacao', {
	    url: "/configuracoes/configurar_tipo_avaliacao",
	    templateUrl: "pages/configuracoes/configurar_tipo_avaliacao.html",
	});

	$urlRouterProvider.otherwise('/home');
})

//CONTROLLERS GERAIS
.controller('goCtrl', function ($scope, $location) { 
	$scope.go = function (path) {
		$location.path(path);
	}
})


.filter('searchForTurma', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(item){
			if(item.descricao_turma.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}
		});
		return result;
	};
});







function insertData(db) {


				//"insert into tb_turma values(0002, 'an�lise e desenvolvimento de sistemas 02', 'ads 02');" 
				//"insert into tb_turma values(0003, 'an�lise e desenvolvimento de sistemas 03', 'ads 03');" +
				//"insert into tb_turma values(0004, 'an�lise e desenvolvimento de sistemas 04', 'ads 04');" +
				//"insert into tb_turma values(0005, 'an�lise e desenvolvimento de sistemas 05', 'ads 05');" +
				//"insert into tb_turma values(0006, 'an�lise e desenvolvimento de sistemas 06', 'ads 06');" +
				//"insert into tb_turma values(0007, 'an�lise e desenvolvimento de sistemas 07', 'ads 07');" +
				//"insert into tb_turma values(0008, 'engenharia de computa��o 01', 'comp 01');" +
				//"insert into tb_turma values(0009, 'engenharia de computa��o 02', 'comp 02');" 

	db.transaction(function (tx) {
		tx.executeSql("insert into tb_tipo_avaliacao values(6, 'Formativa/somativa', 1, 0, 0, 0, 0, 1, 1, 'FORM');", [], function (res) {
			console.log("Inserido");
		}, function (error) {
			console.log('SELECT error: ' + error.message);
		});
	});

	
}

function createADADatabase($cordovaSQLite, db) {

	$cordovaSQLite
		.execute(db,"DROP TABLE IF EXISTS tb_turma");

	$cordovaSQLite
		.execute(db, "create table if not exists tb_turma (" +
						"cod_turma  integer auto_increment primary key,"+
						"descricao_turma text,"+
						"desc_turma text)");

	$cordovaSQLite
		.execute(db,"DROP TABLE IF EXISTS tb_aluno");

	$cordovaSQLite
		.execute(db, "create table if not exists tb_aluno (" +
						"cod_aluno integer auto_increment primary key," +
						"nome_aluno text," +
						"sobrenome_aluno integer," +
						"telefone_aluno integer," +
						"email_aluno integer," +
						"matricula integer," +
						"cod_turma integer," +
						"FOREIGN KEY (cod_turma) REFERENCES tb_turma (cod_turma))");
   

	$cordovaSQLite
		 .execute(db,"DROP TABLE IF EXISTS tb_configuracao");

	$cordovaSQLite
		 .execute(db,"create table if not exists tb_configuracao (" +
						"nome TEXT(8) NOT NULL," +
						"valor TEXT(40))");

	$cordovaSQLite
		 .execute(db,"DROP TABLE IF EXISTS tb_responsavel");

	$cordovaSQLite
		 .execute(db,"create table if not exists tb_responsavel (" +
						"cod_responsavel integer auto_increment primary key, nome_responsavel TEXT(15) NULL," +
						"sobrenome_responsavel TEXT(35) NULL,"+
						"email_responsavel TEXT(40) NULL," +
						"telefone_um TEXT(17) NULL," +
						"telefone_dois TEXT(17) NULL)");

	  $cordovaSQLite
		   .execute(db, "DROP TABLE IF EXISTS tb_responsavel_aluno");

	$cordovaSQLite
		 .execute(db,"create table if not exists tb_responsavel_aluno (" +
						"cod_responsavel INT(6) NOT NULL," +
						"cod_aluno INT(6) NOT NULL)");

	  $cordovaSQLite
		   .execute(db,"DROP TABLE IF EXISTS tb_tipo_avaliacao");

	$cordovaSQLite
		 .execute(db,"create table if not exists tb_tipo_avaliacao (" +
						"cod_tipo_avaliacao integer auto_increment primary key," +
						"descricao_tipo_avaliacao TEXT(20) NULL," +
						"criterio_aprovacao INT(1) NULL," +
						"faltas_abonadas INT(3) NULL," +
						"qtde_avaliacoes_substituidas INT(3) NULL," +
						"preservar_maior_nota INT(1) NULL," +
						"peso_avaliacao INT(3) NULL," +
						"exibe_conceito INT(1) NULL," +
						"exibe_percentual INT(1) NULL," +
						"desc_tipo_avaliacao TEXT(4) NULL)");

	 $cordovaSQLite
		  .execute(db,"DROP TABLE IF EXISTS tb_disciplina");

	$cordovaSQLite
		 .execute(db,"create table if not exists tb_disciplina(" +
						"cod_disciplina integer auto_increment primary key," +
						"descricao_disciplina TEXT(20) NULL," +
						"data_inicio TEXT(8) NULL," +
						"pontuacao_max DOUBLE NULL," +
						"pontuacao_min DOUBLE NULL," +
						"desc_disciplina TEXT(4) NULL)");

	$cordovaSQLite
		 .execute(db,"DROP TABLE IF EXISTS tb_avaliacao");

	$cordovaSQLite
		  .execute(db,"create table if not exists tb_avaliacao(" +
						 "cod_avaliacao integer auto_increment primary key," +
						 "cod_disciplina INT(6) NOT NULL," +
						 "cod_tipo_avaliacao INT(6) NOT NULL," +
						 "valor_avaliacao DOUBLE NOT NULL)");

	 $cordovaSQLite
		  .execute(db,"DROP TABLE IF EXISTS tb_avaliacao_suplementar");

	 $cordovaSQLite
		  .execute(db,"create table if not exists tb_avaliacao_suplementar(" +
						 "cod_avaliacao_substituitiva INT(6) NOT NULL," +
						 "cod_avaliacao_substituida INT(6) NOT NULL)");

	 $cordovaSQLite
		  .execute(db,"DROP TABLE IF EXISTS tb_matricula");

	 $cordovaSQLite
		  .execute(db,"create table if not exists tb_matricula (" +
						 "cod_aluno INT(6) NOT NULL," +
						 "cod_disciplina INT(6) NOT NULL)");

	  $cordovaSQLite
		   .execute(db,"DROP TABLE IF EXISTS tb_avaliacao_aluno");

	 $cordovaSQLite
		  .execute(db,"create table if not exists tb_avaliacao_aluno (" +
						 "cod_avaliacao_aluno integer auto_increment primary key," +
						 "cod_avaliacao INT(6) NOT NULL," +
						 "cod_aluno INT(6) NOT NULL," +
						 "nota_aluno DOUBLE NULL)");

	  $cordovaSQLite
		   .execute(db,"DROP TABLE IF EXISTS tb_conceito");

	  $cordovaSQLite
		   .execute(db,"CREATE TABLE IF NOT EXISTS tb_conceito ( " +
						  "descricao_conceito TEXT(6) NOT NULL," +
						  "valor_max_conceito DOUBLE NOT NULL," +
						  "valor_min_conceito DOUBLE NOT NULL)");

	  $cordovaSQLite
		   .execute(db, "DROP TABLE IF EXISTS tb_foto_aluno");

	  $cordovaSQLite
		   .execute(db,"CREATE TABLE IF NOT EXISTS tb_foto_aluno ( " +
						  "cod_foto_aluno integer auto_increment primary key," +
						  "cod_aluno INT(6) NOT NULL, " +
						  "foto BLOB NULL)");


}

function errorDatabase() {
	console.log("Erro ao criar a base de dados");
}

function successDatabase() {
	console.log("Sucesso ao criar a base de dados");
}
