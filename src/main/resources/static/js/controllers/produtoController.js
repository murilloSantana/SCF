app.controller("produtoController",function($scope,produtoAPI){

	$scope.carregando = true;
	$scope.loadingObj = false;
	$scope.saved = false;
	$scope.drop = false;
	$scope.edit = false;
	
	$scope.listaProduto={};
	
	$scope.loading = function(){
		$scope.loadingObj = true;
	};
	$scope.carregarEditarProd = function(p){
		$scope.prod = p;
	};
	
	// Crud de produtos
	$scope.listarTodosProdutos = function(){
		produtoAPI.listarTodosProdutos().success(function(response){
			$scope.listaProduto = response;
		});
	}
	$scope.listarProduto = function(){
		if($scope.classeAtiva){
			produtoAPI.listarProduto("Serviço").success(function(response){
				$timeout(function(){
					$scope.carregando = false;
					$scope.listaProduto = response;
				},1000);
			}).error(function(){
				alert("erro ao carregar a lista de produtos");
			});	
		}else{
			produtoAPI.listarProduto("Produto").success(function(response){
				$timeout(function(){
					$scope.carregando = false;
					$scope.listaProduto = response;
				},1000);
			}).error(function(){
				alert("erro ao carregar a lista de produtos");
			});
			
		}
		
	}
	
	
	$scope.salvarProduto = function(produto){
		var produtos = {"nome":produto.nome,"preco":produto.preco,"tipo":produto.tipo};
		produtoAPI.verificarProduto(produto.nome,0).success(function(response){
			console.log(response);
			if(response){
				
				alert("Já existe um produto com esse nome, não é permitido cadastrar produtos com nomes repetidos")

				
			}else{
				produtoAPI.salvarProduto(produtos).success(function(response){
					$scope.limpaForm();

					$scope.loading();
					$scope.saved = true;
					$scope.listarProduto();

					$timeout(function(){
						
						$scope.saved = false;
						$scope.loadingObj = false;

					},1000);
					
				}).error(function(){
					alert("Erro ao salvar produto")
				})
			}
		}).error(function(){
			alert("Erro ao salvar produto")
		})
		
		
	};
	
	$scope.excluirProduto = function(produto){
		produtoAPI.excluirProduto(produto.id).success(function(response){
			$scope.loading();
			$scope.drop = true;
			$scope.listarProduto();

			$timeout(function(){

				
				$scope.drop = false;
				$scope.loadingObj = false;

			},1000);
			
		}).error(function(){
			alert("erro ao remover produto");
		});
		
	}
	
	$scope.editarProduto = function(produto,id){
		var produtos={"id":id,"nome":produto.nome,"preco":produto.preco,"tipo":produto.tipo}
		
		
		produtoAPI.verificarProduto(produto.nome,id).success(function(response){
			
			if(response){
				
				alert("Já existe um produto com esse nome, não é permitido cadastrar produtos com nomes repetidos")

				
			}else{
				produtoAPI.editarProduto(produtos).success(function(response){
					$scope.limpaForm();
					$scope.loading();
					$scope.edit = true;
					$scope.listarProduto();

					$timeout(function(){

						$scope.verifica = false;
						
						$scope.edit = false;
						$scope.loadingObj = false;

					},1000);
				}).error(function(){
					alert("erro ao editar produto")
				});
			}
		}).error(function(){
			alert("Erro ao editar produto")
		})
	};
	$scope.listarProduto();

});