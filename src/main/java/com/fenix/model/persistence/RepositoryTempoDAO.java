package com.fenix.model.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.fenix.model.Tempo;

public interface RepositoryTempoDAO extends CrudRepository<Tempo, Integer> {

	@Query(value = "SELECT m.numero,SUM(t.minutos), MIN(t.horaInicio),MAX(t.horaFim),SUM(t.valor), (SELECT SUM(v.precoTotal) FROM Venda v WHERE v.usada = true AND m.id = v.maquina.id) FROM Maquina m,Tempo t WHERE  m.id = t.maquina.id AND t.usada = true GROUP BY m.numero")
	public List<Tempo> temposAtivos();

	@Query(value = "SELECT MAX(t.horaFim) FROM Tempo t INNER JOIN t.maquina m WHERE m.id = t.maquina.id AND t.usada=true AND m.numero = :numero AND t.tempoUsado = true")
	public List<Tempo> ultimoTempoAtivo(@Param("numero") Integer numero);

	@Query(value = "SELECT MAX(t.horaFim) FROM Tempo t INNER JOIN t.maquina m WHERE t.usada=true AND m.numero = :numero ")
	public Long ultimoTA(@Param("numero") Integer numero);

	@Query(value = "SELECT t FROM Tempo t WHERE t.horaFim = :tempoTermino")
	public Tempo findTempoTermino(@Param("tempoTermino") Long tempoTermino);

	@Query(value = "SELECT t FROM Tempo t WHERE t.horaFim < :tempoTermino AND t.usada = true AND t.tempoUsado = true AND t.maquina.id = :id")
	public List<Tempo> verificarTempoAnterior(@Param("id") Integer id, @Param("tempoTermino") Long tempoTermino);

	@Query(value = "SELECT t FROM Tempo t WHERE t.maquina.numero = :numero AND t.usada = true")
	public List<Tempo> listarTempoIndividual(@Param("numero") Integer numero);

	@Query(value = "SELECT t FROM Tempo t WHERE t.usada = true AND t.maquina.numero = :numero")
	public List<Tempo> listaConta(@Param("numero") Integer numero);

	@Query(value = "SELECT t FROM Maquina m, Tempo t WHERE t.maquina.id = :id")
	public List<Tempo> getTempoMaquina(@Param("id") Integer id);
}
