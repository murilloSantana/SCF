app.factory('produtoAPI', function($http) {

	var _listarProduto = function(tipo) {
		return $http.get("listarProduto/"+tipo);
	};

	var _listarTodosProdutos = function() {
		return $http.get("listarTodosProdutos");
	};
	var _salvarProduto = function(produtos) {
		return $http.post("salvarProduto",produtos);
	};
	var _verificarProduto = function(nome,id) {
		return 	$http.get("verificarProduto/"+nome+"/"+id);
	};
	var _excluirProduto = function(id){
		return  $http.delete("excluirProduto/"+id);
	};
	var _editarProduto = function(produtos){
		return 	 $http.put("editarProduto",produtos);				
	};
	var _salvarVendaProduto = function(quantidade,produto) {
		return $http.post("salvarVendaProduto/"+quantidade,produto);
	};
	var _listarProdutoIndividual = function(numero){
		return $http.get("listarProdutoIndividual/"+numero);
	};
	var _salvarProdutoEditado = function(produto){
		return $http.put("salvarProdutoEditado",produto);
	};
	var _excluirProdutoIndividual = function(id){
		return $http.delete("excluirProdutoIndividual/"+id);
	};
	var _listarVendas = function(){
		return $http.get("listarVendas");
	};
	var _pagamentoVenda = function(idProduto){
		return $http.put("pagamentoVenda/"+idProduto);
	};
	return {
		listarProduto : _listarProduto,
		salvarProduto : _salvarProduto,
		verificarProduto : _verificarProduto,
		excluirProduto: _excluirProduto,
		editarProduto: _editarProduto,
		salvarVendaProduto : _salvarVendaProduto,
		listarProdutoIndividual: _listarProdutoIndividual,
		salvarProdutoEditado: _salvarProdutoEditado,
		excluirProdutoIndividual: _excluirProdutoIndividual,
		listarVendas: _listarVendas,
		pagamentoVenda:_pagamentoVenda,
		listarTodosProdutos:_listarTodosProdutos
	};
});
