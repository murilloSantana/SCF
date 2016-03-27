package com.fenix.model.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.fenix.model.ValorHora;

public interface RepositoryValorHoraDAO extends CrudRepository<ValorHora, Integer>{

	@Query(value = "SELECT m.modelo FROM Maquina m GROUP BY m.modelo")
	public List<String> selectModeloDistinto();
	@Query(value = "SELECT v FROM ValorHora v WHERE v.modelo = :modelo")
	public List<ValorHora> selectValorHora(@Param("modelo") String modelo);
} 
