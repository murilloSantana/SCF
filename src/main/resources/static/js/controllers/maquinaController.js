app.controller("maquinaController",function($scope,maquinaAPI){
	$scope.carregando = true;
	$scope.loadingObj = false;
	$scope.saved = false;
	$scope.drop = false;
	$scope.edit = false;

	$scope.listaMaquina ={};
	
	
	$scope.loading = function(){
		$scope.loadingObj = true;
	};
	$scope.carregarEditarMaq= function(m){
		$scope.maq = m;
	};
	// Crud de maquinas

	$scope.listarMaquina = function(){
		maquinaAPI.listarMaquina().success(function(response){
			$timeout(function(){
				$scope.carregando = false;
				$scope.listaMaquina = response;
				console.log(response);	
			},1000);
			
		}).error(function(){
			alert("erro ao carregar a lista de maquinas");
		});
	}
	
	
	
	$scope.salvarMaquina = function(maquina) {
		var maquinas={"numero":maquina.numero,"modelo":maquina.modelo};
		maquinaAPI.verificarMaquina(maquina.numero,0).success(function(response){
			if(response){
				
				alert("Já existe uma maquina com esse numero, não é permitido cadastrar maquinas com numeros repetidos")

				
			}else{
				maquinaAPI.salvarMaquina(maquinas).success(function(response){
					$scope.limpaForm();
					
					$scope.loading();
					$scope.saved = true;
					$scope.listarMaquina();

					$timeout(function(){
						
						
						$scope.saved = false;
						$scope.loadingObj = false;

					},1000);
					

				}).error(function(){
					alert("Erro ao salvar maquina");

				});
			}
		}).error(function(){
			alert("Erro ao salvar maquina")
		})
		
		
		
	};
	
	$scope.excluirMaquina = function(maquina){
		if(maquina.usada == true){
			alert("Não pode excluir uma maquina que está sendo usada");
		}else{
			maquinaAPI.excluirMaquina(maquina.id).success(function(response){

				$scope.loading();
				$scope.drop = true;
				$scope.listarMaquina();

				$timeout(function(){

					
					$scope.drop = false;
					$scope.loadingObj = false;
					
				},1000);
				
			}).error(function(){
				alert("Erro não foi possivel remover a maquina");
			});
		}
	};
	
	$scope.editarMaquina = function(maq,id) {
		var maquinas={"id":id,"numero":maq.numero,"modelo":maq.modelo}
		if(maq.usada == true){
			alert("Não pode editar uma maquina que está sendo usada");
		}else{
			maquinaAPI.verificarMaquina(maq.numero,id).success(function(response){

				if(response){
					
					alert("Já existe uma maquina com esse numero, não é permitido cadastrar maquinas com numeros repetidos")

					
				}else{
					maquinaAPI.editarMaquina(maquinas).success(function(response){
						$scope.limpaForm();
						$scope.loading();
						$scope.edit = true;
						$scope.listarMaquina();

						$timeout(function(){

							$scope.verifica = false;
							
							
							$scope.edit = false;
							$scope.loadingObj = false;

						},1000);
						

					}).error(function(){
						alert("error");
					});
				}
			}).error(function(){
				alert("Erro ao editar maquina")
			})
			
		}
	};
	$scope.listarMaquina();

});
