app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	
	$urlRouterProvider.otherwise("/tempo")
	
	$stateProvider
	//.state("home",{url:"/home", templateUrl:"views/home.html",controller:"controller"})
	.state("maquina",{url:"/maquina",templateUrl:"views/maquina/maquina.html",controller:"controller"})
	.state("produto",{url:"/produto",templateUrl:"views/produto/produto.html",controller:"controller"})
	.state("valor",{url:"/valor",templateUrl:"views/valor/valor.html",controller:"controller"})
	.state("tempo",{url:"/tempo",templateUrl:"views/tempoAtual/tempo.html",controller:"controller"})
	.state("historico-tempos",{url:"/historico-tempos",templateUrl:"views/historico/historico_tempos.html",controller:"controller"})
	.state("historico-produtos",{url:"/historico-produtos",templateUrl:"views/historico/historico_produtos.html",controller:"controller"})
	.state("suporte",{url:"/suporte-tecnico",templateUrl:"views/suporte.html",controller:"controller"})
	.state("venda",{url:"/venda",templateUrl:"views/venda/venda.html",controller:"controller"})

	$locationProvider.html5Mode(true);
});