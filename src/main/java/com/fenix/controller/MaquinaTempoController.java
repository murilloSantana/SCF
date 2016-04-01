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
import com.fenix.model.Tempo;
import com.fenix.model.Venda;
import com.fenix.model.persistence.RepositoryMaquinaDAO;
import com.fenix.model.persistence.RepositoryTempoDAO;
import com.fenix.model.persistence.RepositoryVendaDAO;

@Controller
public class MaquinaTempoController {
	@Autowired
	private RepositoryMaquinaDAO maquinaDao;
	@Autowired
	private RepositoryTempoDAO tempoDao;
	@Autowired
	private RepositoryVendaDAO vendaDao;

	@RequestMapping(value = "/")
	public String ola() {
		return "index";
	}
	@RequestMapping("/{[path:[^\\.]*}")
    public String apppplicationContext() {
        return "forward:/";
    }
	@RequestMapping(value = "salvarMaquina", method = RequestMethod.POST)
	public @ResponseBody void salvarMaquina(@RequestBody Maquina maquina) {
		maquinaDao.save(maquina);
	}

	@RequestMapping(value = "excluirMaquina/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void removerMaquina(@PathVariable("id") Integer id) {
		try {
			List<Venda> vendas = vendaDao.getVendaMaquina(id);
			for (Venda venda : vendas) {
				venda.setMaquina(null);
			}
			List<Tempo> tempos = tempoDao.getTempoMaquina(id);
			for (Tempo tempo : tempos) {
				tempo.setMaquina(null);
			}
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			maquinaDao.delete(id);
		}

	}

	@RequestMapping(value = "listarMaquina", method = RequestMethod.GET)
	public @ResponseBody List<Maquina> listaMaquina() {
		
		return maquinaDao.listarTodos();
	}

	@RequestMapping(value = "editarMaquina", method = RequestMethod.PUT)
	public @ResponseBody void editarMaquina(@RequestBody Maquina maquina) {
		maquinaDao.save(maquina);

	}

	@RequestMapping(value = "verificarMaquina/{numero}/{id}", method = RequestMethod.GET)
	public @ResponseBody boolean existeMaquina(@PathVariable("numero") Integer numero, @PathVariable("id") Integer id) {
		List<Maquina> maquinas = maquinaDao.findNumero(numero, id);
		boolean existe = false;
		if (maquinas.size() > 0) {
			existe = true;
		}
		return existe;

	}

	@RequestMapping(value = "verificarTempo/{numero}", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> verificarTempo(@PathVariable("numero") Integer numero) {

		List<Tempo> tempos = tempoDao.ultimoTempoAtivo(numero);
		return tempos;
	}

	@RequestMapping(value = "salvarTempo/{id}", method = RequestMethod.POST)
	public void salvarTempo(@PathVariable("id") Integer id, @RequestBody Tempo tempo) {
		Maquina maq = maquinaDao.findOne(id);
		maq.setUsada(true);
		tempo.setMaquina(maq);
		Date data = new Date();
		tempo.setHoraInicio(data.getTime());
		Long fim = tempo.getMinutos() * 60000L;
		tempo.setHoraFim(data.getTime() + fim);
		tempo.setNumeroMaquina(tempo.getMaquina().getNumero());

		try {
			List<Tempo> temposAnteriores = tempoDao.verificarTempoAnterior(id, tempo.getHoraFim());

			for (Tempo t : temposAnteriores) {
				t.setTempoUsado(false);
				tempoDao.save(t);
			}
		} finally {
			System.out.println("erro");
		}

		tempoDao.save(tempo);
	}

	@RequestMapping(value = "salvarNovoTempo/{id}", method = RequestMethod.POST)
	public void salvarNovoTempo(@PathVariable("id") Integer id, @RequestBody Tempo tempo) {
		Maquina maq = maquinaDao.findOne(id);
		maq.setUsada(true);
		Long ultimoTempo = tempoDao.ultimoTA(maq.getNumero());
		tempo.setMaquina(maq);
		tempo.setHoraInicio(ultimoTempo);
		Long fim = tempo.getMinutos() * 60000L;
		tempo.setHoraFim(ultimoTempo + fim);
		tempo.setNumeroMaquina(tempo.getMaquina().getNumero());
		try {
			List<Tempo> temposAnteriores = tempoDao.verificarTempoAnterior(id, tempo.getHoraFim());

			for (Tempo t : temposAnteriores) {
				t.setTempoUsado(false);
				tempoDao.save(t);
			}
		} finally {
			System.out.println("erro");
		}
		tempoDao.save(tempo);
	}
	@RequestMapping(value = "listarTempoLivre/{numero}", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> listarTempoLivre(@PathVariable("numero") Integer numero) {
		List<Tempo> tempos = tempoDao.listaConta(numero);
		return tempos;
	}
	
	@RequestMapping(value = "salvarTempoLivre/{id}", method = RequestMethod.POST)
	public void salvarTempoLivre(@PathVariable("id") Integer id, @RequestBody Tempo tempo) {
		Maquina maq = maquinaDao.findOne(id);
		maq.setUsada(true);
		tempo.setMaquina(maq);
		Date data = new Date();
		tempo.setHoraInicio(data.getTime());
		tempo.setHoraFim(0L);
		tempo.setNumeroMaquina(tempo.getMaquina().getNumero());

		try {
			List<Tempo> temposAnteriores = tempoDao.verificarTempoAnterior(id, tempo.getHoraFim());

			for (Tempo t : temposAnteriores) {
				t.setTempoUsado(false);
				tempoDao.save(t);
			}
		} finally {
			System.out.println("erro");
		}

		tempoDao.save(tempo);
	}

	@RequestMapping(value = "listarTemposAtivos", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> listarTemposAtivos() {
		return tempoDao.temposAtivos();
	}
	
	@RequestMapping(value = "excluirTemposAtivos/{numero}", method = RequestMethod.GET)
	public @ResponseBody void excluirTemposAtivos(@PathVariable("numero") Integer numero) {
		try {
			List<Tempo> tempos = tempoDao.listaConta(numero);
			List<Venda> vendas = vendaDao.listaConta(numero);
			for (Tempo tempo : tempos) {
				Maquina maquina = tempo.getMaquina();
				maquina.setUsada(false);
				maquinaDao.save(maquina);
				tempoDao.delete(tempo.getId());
			}
			for (Venda venda : vendas) {
				vendaDao.delete(venda.getId());
			}
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

	@RequestMapping(value = "tempoUsado/{tempoTermino}", method = RequestMethod.PUT)
	public void editarTempoUsado(@PathVariable("tempoTermino") Long tempoTermino) {
		try {
			if (tempoTermino != null) {
				Tempo t = tempoDao.findTempoTermino(tempoTermino);
				t.setTempoUsado(false);
				tempoDao.save(t);
			}
		} catch (Exception e) {
		}
	}

	@RequestMapping(value = "listarTempoIndividual/{numero}", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> menorTempoAtivo(@PathVariable("numero") Integer numero) {
		return tempoDao.listarTempoIndividual(numero);
	}

	@RequestMapping(value = "excluirTempoIndividual/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void excluirTempoIndividual(@PathVariable("id") Integer id) {
		Integer contador = 0;
		Tempo tempo = tempoDao.findOne(id);
		List<Tempo> tempos = (List<Tempo>) tempoDao.findAll();
		List<Venda> vendas = (List<Venda>) vendaDao.findAll();
		Maquina maquinaTempo = tempo.getMaquina();

		for (Tempo tempo2 : tempos) {
			if(tempo2.getMaquina().getId() == maquinaTempo.getId() && tempo2.getUsada() == true){
				contador++;
			}
		}
		
		
		if(contador < 2){
			maquinaTempo.setUsada(false);
			maquinaDao.save(maquinaTempo);
			for (Venda v : vendas) {
				if(v.getMaquina() != null){
					if(v.getMaquina().getId() == maquinaTempo.getId() && v.getUsada() == true){
						vendaDao.delete(v.getId());
					}	
				}
				
			}
		}
		
		tempoDao.delete(id);
	}

	@RequestMapping(value = "fecharConta/{numero}", method = RequestMethod.PUT)
	public @ResponseBody void fecharConta(@PathVariable("numero") Integer numero) {
		try {
			List<Tempo> tempos = tempoDao.listaConta(numero);
			List<Venda> vendas = vendaDao.listaConta(numero);
			for (Tempo tempo : tempos) {
				tempo.setUsada(false);
				tempo.setTempoUsado(false);
				Maquina maquina = tempo.getMaquina();
				maquina.setUsada(false);
				maquinaDao.save(maquina);
				tempoDao.save(tempo);
			}
			for (Venda venda : vendas) {
				venda.setUsada(false);
				vendaDao.save(venda);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

	@RequestMapping(value = "salvarTempoEditado", method = RequestMethod.PUT)
	public void salvarTempoEditado(@RequestBody Tempo tempo) {
		tempoDao.save(tempo);
	}

	@RequestMapping(value = "listarTempos", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> listarTempos() {
		return (List<Tempo>) tempoDao.findAll();
	}

	@RequestMapping(value = "pagamentoTempo/{idTempo}", method = RequestMethod.PUT)
	public void pagamentoTempo(@PathVariable("idTempo") Integer idTempo) {
		Tempo tempo = tempoDao.efetuarPagamentoTempo(idTempo);
			tempo.setPago(true);
			tempoDao.save(tempo);
	}
	@RequestMapping(value = "listarTemposDA/{dia}/{mes}/{ano}", method = RequestMethod.GET)
	public @ResponseBody List<Tempo> listarTemposDA(@PathVariable("dia") Integer dia, @PathVariable("mes") Integer mes,
			@PathVariable("ano") Integer ano) {
		return tempoDao.listarTemposDA(dia,mes,ano);
	}
}
