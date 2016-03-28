package com.fenix.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Venda {
	@Id
	@GeneratedValue
	private Integer id;
	@Column
	private Boolean usada;
	@Column
	private long dtVenda;
	@ManyToOne
	@JoinColumn(name = "maquina_id")
	private Maquina maquina;
	@ManyToOne()
	@JoinColumn(name = "produto_id")
	private Produto produto;
	@Column
	private Double preco;
	@Column
	private Double precoTotal;
	@Column
	private Integer quantidade;
	@Column
	private String nomeProduto;
	@Column
	private Integer numeroMaquina;
	@Column
	private Boolean pago;
	
	
	public Boolean getPago() {
		return pago;
	}

	public void setPago(Boolean pago) {
		this.pago = pago;
	}

	public Integer getNumeroMaquina() {
		return numeroMaquina;
	}

	public void setNumeroMaquina(Integer numeroMaquina) {
		this.numeroMaquina = numeroMaquina;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getUsada() {
		return usada;
	}

	public void setUsada(Boolean usada) {
		this.usada = usada;
	}

	public long getDtVenda() {
		return dtVenda;
	}

	public void setDtVenda(long l) {
		this.dtVenda = l;
	}

	public Maquina getMaquina() {
		return maquina;
	}

	public void setMaquina(Maquina maquina) {
		this.maquina = maquina;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

	public Double getPrecoTotal() {
		return precoTotal;
	}

	public void setPrecoTotal(Double precoTotal) {
		this.precoTotal = precoTotal;
	}

	public String getNomeProduto() {
		return nomeProduto;
	}

	public void setNomeProduto(String nomeProduto) {
		this.nomeProduto = nomeProduto;
	}

}
