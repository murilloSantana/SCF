package com.fenix.model.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fenix.model.Maquina;

public interface RepositoryMaquinaDAO extends CrudRepository<Maquina, Integer> {

	@Query(value = "SELECT m FROM Maquina m WHERE m.numero = :numero AND m.id <> :id")
	public List<Maquina> findNumero(@Param("numero") Integer numero,@Param("id") Integer id);
	@Query(value = "SELECT m FROM Maquina m ORDER BY m.numero")
	public List<Maquina> listarTodos();


}
