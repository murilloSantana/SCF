package com.fenix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fenix.model.ValorHora;
import com.fenix.model.persistence.RepositoryValorHoraDAO;

@Controller
public class ValorHoraController {
	@Autowired
	private RepositoryValorHoraDAO valorHoraDao;

	@RequestMapping(value = "salvarHora", method = RequestMethod.POST)
	public @ResponseBody void salvarHora(@RequestBody ValorHora valorHora) {
		valorHoraDao.save(valorHora);
	}

	@RequestMapping(value = "excluirHora/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void excluirHora(@PathVariable("id") Integer id) {
		valorHoraDao.delete(id);
	}

	@RequestMapping(value = "editarHora", method = RequestMethod.PUT)
	public @ResponseBody void editarHora(@RequestBody ValorHora valorHora) {
		valorHoraDao.save(valorHora);
	}

	@RequestMapping(value = "listarValorHora", method = RequestMethod.GET)
	public @ResponseBody List<ValorHora> listar() {
		return (List<ValorHora>) valorHoraDao.findAll();

	}

	@RequestMapping(value = "listarModelo", method = RequestMethod.GET)
	public @ResponseBody List<String> listaModelos() {
		return valorHoraDao.selectModeloDistinto();
	}
	@RequestMapping(value = "selectValorHora/{modelo}", method = RequestMethod.GET)
	public @ResponseBody List<ValorHora> selectValorHora(@PathVariable("modelo") String modelo){
		return valorHoraDao.selectValorHora(modelo);
	}
}
