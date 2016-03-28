package com.fenix.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Tempo {
	@Id
	@GeneratedValue
	private Integer id;
	@Column
	private Integer minutos;
	@Column
	private Double valor;
	@Column
	private Boolean usada;
	@Column
	private Boolean tempoUsado;
	@Column
	private Long horaInicio;
	@Column
	private Long horaFim;
	@Column
	private Integer numeroMaquina;
	@Column
	private Boolean pago;
	@ManyToOne
	@JoinColumn(name = "maquina_id")
	private Maquina maquina;

	public Boolean getPago() {
		return pago;
	}

	public void setPago(Boolean pago) {
		this.pago = pago;
	}

	public Maquina getMaquina() {
		return maquina;
	}

	public void setMaquina(Maquina maquina) {
		this.maquina = maquina;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMinutos() {
		return minutos;
	}

	public void setMinutos(Integer minutos) {
		this.minutos = minutos;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Boolean getUsada() {
		return usada;
	}

	public void setUsada(Boolean usada) {
		this.usada = usada;
	}

	public Long getHoraInicio() {
		return horaInicio;
	}

	public void setHoraInicio(Long horaInicio) {
		this.horaInicio = horaInicio;
	}

	public Long getHoraFim() {
		return horaFim;
	}

	public void setHoraFim(Long horaFim) {
		this.horaFim = horaFim;
	}

	public Boolean getTempoUsado() {
		return tempoUsado;
	}

	public void setTempoUsado(Boolean tempoUsado) {
		this.tempoUsado = tempoUsado;
	}

	public Integer getNumeroMaquina() {
		return numeroMaquina;
	}

	public void setNumeroMaquina(Integer numeroMaquina) {
		this.numeroMaquina = numeroMaquina;
	}

}
