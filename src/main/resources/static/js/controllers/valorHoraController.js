app.controller("valorHoraController",function($scope,valorHoraAPI){
	$scope.carregando = true;
	$scope.loadingObj = false;
	$scope.saved = false;
	$scope.drop = false;
	$scope.edit = false;
	$scope.verifica = false;

	$scope.listaHora ={};
	$scope.listaModelo={};
	
	$scope.carregarEditarValor= function(vh){
		$scope.v = vh;
	}
	$scope.selectValorHora = function(modelo){
		valorHoraAPI.selectValorHora(modelo).success(function(response){
			$scope.valorHoraSelecionada = response;
		});
	};
	
	
	$scope.listarHora = function(){
		valorHoraAPI.listarHora().success(function(response){
			
			$timeout(function(){
				$scope.carregando = false;
				$scope.listaHora = response;
				valorHoraAPI.listarModelo().success(function(response){
					$scope.listaModelo = response;
				})
				console.log(response);	
			},1000);
		}).error(function(){
			("erro ao carregar lista de horas");
		})	
		
	};
	
	$scope.salvarHora = function(valorHora,modelo){
		var horas = {"minuto":valorHora.minuto,"preco":valorHora.preco,"modelo":modelo}
		valorHoraAPI.salvarHora(horas).success(function(){
			$scope.limpaForm();
			$scope.loading();
			$scope.saved = true;
			$scope.listarHora();

			$timeout(function(){
				
				
				$scope.saved = false;
				$scope.loadingObj = false;

			},1000);
			
		}).error(function(){
			alert("erro ao salvar nova hora")
		})
	};
	
	$scope.excluirHora = function(valorHora){
		valorHoraAPI.excluirHora(valorHora.id).success(function(){
			$scope.loading();
			$scope.drop = true;
			$scope.listarHora();

			$timeout(function(){

				
				$scope.drop = false;
				$scope.loadingObj = false;

			},1000);
			
		}).error(function(){
			alert("erro ao remover hora");
		});
		
	};
	
	$scope.editarHora = function(valorHora,id){
		var hora = {"id":id,"minuto":valorHora.minuto,"preco":valorHora.preco,"modelo":valorHora.modelo};
		valorHoraAPI.editarHora(hora).success(function(){
			$scope.limpaForm();
			$scope.loading();
			$scope.edit = true;
			$scope.listarHora();

			$timeout(function(){

				$scope.verifica = false;
				$scope.edit = false;
				$scope.loadingObj = false;

			},1000);
		}).error(function(){
			alert("erro ao editar hora");
		})
	};
});