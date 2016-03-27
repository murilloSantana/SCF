package com.fenix.model.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.fenix.model.Produto;
import com.fenix.model.Tempo;

public interface RepositoryProdutoDAO extends CrudRepository<Produto,Integer>{

	@Query(value="SELECT p FROM Produto p WHERE p.nome = :nome AND p.id <> :id")
	public List<Produto> findNome(@Param("nome") String nome,@Param("id") Integer id);

}
