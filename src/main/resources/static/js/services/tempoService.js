app.factory('tempoAPI', function($http) {

	var _listarTemposAtivos = function() {
		return $http.get("listarTemposAtivos");
	}

	var _salvarTempo= function(id,tempo) {
		return $http.post("salvarTempo/"+id,tempo);
	};
	var _salvarNovoTempo= function(id,novoTempo) {
		return $http.post("salvarNovoTempo/"+id,novoTempo);
	};
	var _verificarTempo = function(numero) {
		return $http.get("verificarTempo/"+numero);
	};
	var _fecharConta = function(num){
		return $http.put("fecharConta/"+num);
	};
	var _excluirTemposAtivos = function(num){
		return $http.get("excluirTemposAtivos/"+num);
	};
	var _listarTempoIndividual = function(numero){
		return 	$http.get("listarTempoIndividual/"+numero);
	};
	var _editarTempoUsado = function(tmp){
		return $http.put("tempoUsado/"+tmp);
	};
	
	var _editarTempoIndividual = function(tempo){
		return $http.put("editarTempoIndividual",tempo);
	};
	var _salvarTempoEditado = function(subItem){
		return $http.put("salvarTempoEditado",subItem);
	};
	var _excluirTempoIndividual = function(id){
		return $http.delete("excluirTempoIndividual/"+id);
	};
	var _listarTempos = function(){
		return $http.get("listarTempos");
	};
	var _listarTempoLivre = function(numero){
		return $http.get("listarTempoLivre/"+numero);
	};
	var _salvarTempoLivre = function(id,tempo){
		return $http.post("salvarTempoLivre/"+id,tempo);
	};
	
	return {
		listarTemposAtivos : _listarTemposAtivos,
		salvarTempo : _salvarTempo,
		salvarNovoTempo : _salvarNovoTempo,
		verificarTempo : _verificarTempo,
		fecharConta: _fecharConta,
		excluirTemposAtivos: _excluirTemposAtivos,
		listarTempoIndividual: _listarTempoIndividual,
		editarTempoUsado: _editarTempoUsado,
		editarTempoIndividual: _editarTempoIndividual,
		salvarTempoEditado: _salvarTempoEditado,
		excluirTempoIndividual: _excluirTempoIndividual,
		listarTempos: _listarTempos,
		salvarTempoLivre: _salvarTempoLivre,
		listarTempoLivre: _listarTempoLivre
	};
});
