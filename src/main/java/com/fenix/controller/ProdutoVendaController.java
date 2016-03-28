package com.fenix.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fenix.model.Maquina;
import com.fenix.model.Produto;
import com.fenix.model.Tempo;
import com.fenix.model.Venda;
import com.fenix.model.persistence.RepositoryMaquinaDAO;
import com.fenix.model.persistence.RepositoryProdutoDAO;
import com.fenix.model.persistence.RepositoryVendaDAO;

@Controller
public class ProdutoVendaController {

	@Autowired
	private RepositoryProdutoDAO produtoDao;
	@Autowired
	private RepositoryVendaDAO vendaDao;
	@Autowired
	private RepositoryMaquinaDAO maquinaDao;

	@RequestMapping(value = "salvarProduto", method = RequestMethod.POST)
	public @ResponseBody void salvarProduto(@RequestBody Produto produto) {
		produtoDao.save(produto);
	}

	@RequestMapping(value = "listarProduto/{tipo}", method = RequestMethod.GET)
	public @ResponseBody List<Produto> listarProduto(@PathVariable("tipo") String tipo) {
		return produtoDao.listarProduto(tipo);
	}
	
	@RequestMapping(value = "listarTodosProdutos", method = RequestMethod.GET)
	public @ResponseBody List<Produto> listarTOdosProdutos() {
		return (List<Produto>) produtoDao.findAll();
	}
	
	@RequestMapping(value = "excluirProduto/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void excluirProduto(@PathVariable("id") Integer id) {
		try {
			List<Venda> vendas = vendaDao.getVendaProduto(id);
			for (Venda v : vendas) {
				v.setProduto(null);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			produtoDao.delete(id);
		}
		
		
	}

	@RequestMapping(value = "editarProduto", method = RequestMethod.PUT)
	public @ResponseBody void editarProduto(@RequestBody Produto produto) {
		produtoDao.save(produto);
	}

	@RequestMapping(value = "verificarProduto/{nome}/{id}", method = RequestMethod.GET)
	public @ResponseBody boolean existeProduto(@PathVariable("nome") String nome,@PathVariable("id") Integer id) {
		List<Produto> produtos = produtoDao.findNome(nome,id);
		boolean existe = false;
		if (produtos.size() > 0) {
			existe = true;
		}
		return existe;

	}

	@RequestMapping(value = "salvarVendaProduto/{quantidade}", method = RequestMethod.POST)
	public @ResponseBody void salvarVendaProduto(@PathVariable("quantidade") Integer quantidade,@RequestBody Produto produto) {
		Venda venda = new Venda();
		venda.setUsada(false);
		venda.setProduto(produto);
		Date date = new Date();
		venda.setDtVenda(date.getTime());
		venda.setPreco(produto.getPreco());
		venda.setQuantidade(quantidade);
		venda.setPrecoTotal(venda.getPreco()*venda.getQuantidade());
		venda.setNomeProduto(produto.getNome());
		vendaDao.save(venda);
	}

	@RequestMapping(value = "salvarVendaMaquina/{id}/{quantidade}", method = RequestMethod.POST)
	public void salvarVendaMaquina(@PathVariable("id") Integer id, @PathVariable("quantidade") Integer quantidade,
			@RequestBody Produto produto) {
		Venda venda = new Venda();
		Maquina maquina = maquinaDao.findOne(id);
		venda.setUsada(true);
		venda.setProduto(produto);
		Date data = new Date();
		venda.setDtVenda(data.getTime());
		venda.setMaquina(maquina);
		venda.setPreco(produto.getPreco());
		venda.setQuantidade(quantidade);
		venda.setPrecoTotal(venda.getPreco()*venda.getQuantidade());
		venda.setNomeProduto(produto.getNome());
		venda.setNumeroMaquina(maquina.getNumero());
		vendaDao.save(venda);
	}
	
	@RequestMapping(value = "listarProdutoIndividual/{numero}", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> menorTempoAtivo(@PathVariable("numero") Integer numero){
		return vendaDao.listarProdutoIndividual(numero);
	}
	@RequestMapping(value = "salvarProdutoEditado", method = RequestMethod.PUT)
	public void salvarProdutoEditado(@RequestBody Venda venda){
		vendaDao.save(venda);
	}
	@RequestMapping(value = "excluirProdutoIndividual/{id}", method = RequestMethod.DELETE)
	public void excluirProdutoIndividual(@PathVariable("id") Integer id){
		vendaDao.delete(id);
	}
	@RequestMapping(value = "listarVendas", method = RequestMethod.GET)
	public @ResponseBody List<Venda> listarVendas(){
		return (List<Venda>) vendaDao.findAll();
	}
	
	@RequestMapping(value = "pagamentoVenda/{idProduto}", method = RequestMethod.PUT)
	public void pagamentoVenda(@PathVariable("idProduto") Integer idProduto) {
		Venda venda = vendaDao.efetuarPagamentoVenda(idProduto);
			venda.setPago(true);
			vendaDao.save(venda);
	}
 }
