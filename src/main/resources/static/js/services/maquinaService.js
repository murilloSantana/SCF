app.factory('maquinaAPI', function($http) {

	var _listarMaquina = function() {
		return $http.get("listarMaquina");
	}

	var _salvarMaquina = function(maquinas) {
		return $http.post("salvarMaquina", maquinas);
	};
	var _verificarMaquina = function(numero,id) {
		return $http.get("verificarMaquina/" + numero + "/" + id);
	};
	var _excluirMaquina = function(id){
		return $http.delete("excluirMaquina/"+id);
	};
	var _editarMaquina = function(maquinas){
		return $http.put("editarMaquina",maquinas);				
	};
	var _salvarVendaMaquina = function(id,quantidade,produto) {
		return 	$http.post("salvarVendaMaquina/"+id+"/"+quantidade,produto);
	};
	
	return {
		listarMaquina : _listarMaquina,
		salvarMaquina : _salvarMaquina,
		verificarMaquina : _verificarMaquina,
		excluirMaquina: _excluirMaquina,
		editarMaquina: _editarMaquina,
		salvarVendaMaquina: _salvarVendaMaquina

	}
});
