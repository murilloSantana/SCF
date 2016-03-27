package com.fenix.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
public class Maquina {
	@Id
	@GeneratedValue
	private Integer id;
	@Column
	private Integer numero;
	@Column
	private String modelo;
	@Column
	private Boolean usada;
	/*@OneToMany(mappedBy = "maquina")
	private List<Tempo> tempo;

	public List<Tempo> getTempo() {
		return tempo;
	}

	public void setTempo(List<Tempo> tempo) {
		this.tempo = tempo;
	}*/

	public Integer getId() {
		return id;
	}

	public Boolean getUsada() {
		return usada;
	}

	public void setUsada(Boolean usada) {
		this.usada = usada;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getNumero() {
		return numero;
	}

	public void setNumero(Integer numero) {
		this.numero = numero;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

}
