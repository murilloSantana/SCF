app.factory('valorHoraAPI', function($http) {

	var _listarHora = function() {
		return $http.get("listarValorHora");
	}

	var _salvarHora = function(horas) {
		return $http.post("salvarHora",horas);
	};
	
	var _excluirHora = function(id){
		return $http.delete("excluirHora/"+id);
	};
	var _editarHora = function(hora){
		return $http.put("editarHora",hora);				
	};
	
	var _listarModelo = function(){
		return $http.get("listarModelo");
	};
	
	var _selectValorHora = function(modelo){
		return $http.get("selectValorHora/"+modelo);
	};
	return {
		listarHora : _listarHora,
		salvarHora : _salvarHora,
		excluirHora: _excluirHora,
		editarHora: _editarHora,
		listarModelo: _listarModelo,
		selectValorHora: _selectValorHora
	}
});
