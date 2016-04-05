app.factory('caixaAPI', function($http) {

	
	var _listarMovimentacao = function(dia,mes,ano){
		return $http.get("listarMovimentacao/"+dia+"/"+mes+"/"+ano);
	};
	var _salvarMovimentacao = function(movimentacao) {
		return $http.post("salvarMovimentacao", movimentacao);
	};
	
	return {
		listarMovimentacao : _listarMovimentacao,
		salvarMovimentacao : _salvarMovimentacao
		
	}
});
