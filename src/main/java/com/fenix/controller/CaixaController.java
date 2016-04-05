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

import com.fenix.model.Caixa;
import com.fenix.model.persistence.RepositoryCaixaDAO;
@Controller
public class CaixaController {
	@Autowired
	private RepositoryCaixaDAO caixaDao;
	
	@RequestMapping(value = "salvarMovimentacao", method = RequestMethod.POST)
	public @ResponseBody void salvarMovimentacao(@RequestBody Caixa caixa){
		Date data = new Date();
		caixa.setDtMovimentacao(data.getTime());
		caixaDao.save(caixa);
	}
	
	@RequestMapping(value = "listarMovimentacao/{dia}/{mes}/{ano}", method = RequestMethod.GET)
	public @ResponseBody List<Caixa> listarMovimentacao(@PathVariable("dia") Integer dia,@PathVariable("mes") Integer mes,@PathVariable("ano") Integer ano){
		return caixaDao.listarMovimentacao(dia, mes, ano);
	}
	
}
