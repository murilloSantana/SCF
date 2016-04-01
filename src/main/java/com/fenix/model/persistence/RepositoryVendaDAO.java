package com.fenix.model.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.fenix.model.Tempo;
import com.fenix.model.Venda;

public interface RepositoryVendaDAO extends CrudRepository<Venda, Integer>{

	@Query(value = "SELECT v FROM Venda v WHERE v.maquina.numero = :numero AND v.usada = true")
	public List<Tempo> listarProdutoIndividual(@Param("numero") Integer numero);
	@Query(value = "SELECT v FROM Maquina m, Venda v WHERE v.maquina.id = :id")
	public List<Venda> getVendaMaquina(@Param("id") Integer id);
	@Query(value = "SELECT v FROM Produto p, Venda v WHERE v.produto.id = :id")
	public List<Venda> getVendaProduto(@Param("id") Integer id);
	@Query(value = "SELECT v FROM Venda v WHERE v.usada = true AND v.maquina.numero = :numero")
	public List<Venda> listaConta(@Param("numero") Integer numero);
	@Query(value = "SELECT v FROM Venda v WHERE v.id = :id")
	public Venda efetuarPagamentoVenda(@Param("id") Integer id);
	@Query(value = "SELECT * FROM venda v WHERE DAY(FROM_UNIXTIME(v.dt_venda /1000)) = :dia AND MONTH(FROM_UNIXTIME(v.dt_venda /1000)) = :mes AND YEAR(FROM_UNIXTIME(v.dt_venda /1000)) = :ano",nativeQuery= true)
	public List<Venda> listarVendasDA(@Param("dia") Integer dia,@Param("mes") Integer mes,@Param("ano") Integer ano);
}
