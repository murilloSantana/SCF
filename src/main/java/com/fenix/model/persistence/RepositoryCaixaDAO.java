package com.fenix.model.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.fenix.model.Caixa;

public interface RepositoryCaixaDAO extends CrudRepository<Caixa, Integer>{
	
	@Query(value = "SELECT * FROM caixa c WHERE DAY(FROM_UNIXTIME(c.dt_movimentacao /1000)) = :dia AND MONTH(FROM_UNIXTIME(c.dt_movimentacao /1000)) = :mes AND YEAR(FROM_UNIXTIME(c.dt_movimentacao /1000)) = :ano",nativeQuery= true)
	public List<Caixa> listarMovimentacao(@Param("dia") Integer dia,@Param("mes") Integer mes,@Param("ano") Integer ano);
}
