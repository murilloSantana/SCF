package com.fenix.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Caixa {
	@Id
	@GeneratedValue
	private Integer id;
	@Column
	private Double valor;
	@Column
	private String motivo;
	@Column
	private Long dtMovimentacao;
	@Column
	private String tipo;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	public Long getDtMovimentacao() {
		return dtMovimentacao;
	}

	public void setDtMovimentacao(Long dtMovimentacao) {
		this.dtMovimentacao = dtMovimentacao;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

}
