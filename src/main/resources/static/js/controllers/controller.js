app.controller("controller",function($scope,$http,$location,maquinaAPI,produtoAPI,valorHoraAPI,tempoAPI,$timeout,$interval,$compile,$cookieStore)
	{
		$scope.isProduto = false;
		$scope.isTempo = false;
		$scope.verifica = false;
		$scope.carregando = true;
		$scope.btnVenda = true;
		$scope.detalhesProduto = false;
		$scope.mostrarSubItemTempo  = false;
		$scope.mostrarSubItemProduto=false;
		$scope.saved = false;
		$scope.drop = false;
		$scope.edit = false;
		$scope.loadingObj = false;
		$scope.classeAtive=false;
		$scope.tipoProduto=["Produto","Serviço"];
		// listas
		$scope.listaMaquina;
		$scope.listaProduto;
		$scope.listaHora;
		$scope.listaTemposAtivos;
		$scope.listaProdutoIndividual;
		$scope.listaModelo;
		// atributos pagination
		$scope.pageSize = 8;

		$scope.numeros = [8,20,50,100];
		$scope.currentPage = 1;
		$scope.tipos=["Sugestão","Critica","Erro","Dúvida"];
		// atributos de edicao
		$scope.maq = {};
		$scope.prod = {};
		$scope.v = {};
		$scope.valorHora = {};
		$scope.modelo = {};
		$scope.maqProdSelec={};
		$scope.produto = {};
		$scope.maquina = {};
		$scope.modelo={};
		// $scope.selected={};
		// $scope.quantidade={};

		
		$scope.cancelarEdicao = function(){
		 $scope.maq = {};
		 $scope.prod = {};
		 $scope.v = {};
		 $scope.listarMaquina();
		 $scope.listarProduto();
		 $scope.listarHora();
		}
		
		$scope.loading = function(){
			$scope.loadingObj = true;
		};
		
		$scope.numeroFiltro = function(){
			$scope.listaFiltrada = [];
			$scope.listaTA = {};
			$scope.listaComparar = {};
			maquinaAPI.listarMaquina().success(function(response){
				$scope.listaComparar = response
				tempoAPI.listarTemposAtivos().success(function(response){
					$scope.listaTA = response;
					$scope.listaTA.forEach(function(lta){
						$scope.listaComparar.forEach(function(li){
							if(li.numero == lta['0']){
								$scope.listaFiltrada.push(li);
							}
						})
					});
			})
			})
			
			
		
			
			
			
		};
		
		
		$scope.listarTemposAtivos = function(){
			$scope.numeroFiltro(); 

			tempoAPI.listarTemposAtivos().success(function(response){
				$timeout(function(){
					$scope.listaTemposAtivos = response;
					console.log(response);
					$scope.listaTemposAtivos.forEach(function(lt){
						// $scope.numeroFiltro = lt['0'];
						var data = new Date();
						lt['20'] = false;
						lt['21'] = false;
						$scope.horaBanco = data.setTime(lt['3']);
						if(lt['5'] == null || lt['5'] == undefined){
							lt['5'] = 0;	
						}
						
				});
				},1000);
			}).error(function(){
				console.log("erro")
			});
		}


		// validar se o tempo acabou
		$interval(function(){
			

			  if (Notification.permission !== "granted"){
				    Notification.requestPermission();
			  }
			  
			var data = new Date();
			$scope.horaAtual = data.getTime();

				if($scope.listaTemposAtivos != null && $scope.listaTemposAtivos != undefined ){
					
					$scope.listaTemposAtivos.forEach(function(lt){
						$scope.horaBanco = data.setTime(lt['3']);
						
						if(($scope.horaBanco - $scope.horaAtual - 79200000) < - 79200000 && lt['1']!= 0){
							lt['20'] = !lt['20'];
							if(!lt['21']){
								$scope.editarTempoUsado(lt['3']);
							
								if (Notification.permission !== "granted")
								    Notification.requestPermission();
								  else {
								    
									  var notification = new Notification('Tempo Encerrado',{
											 icon: 'img/alarme.png',
											 body: "Tempo Encerrado na maquina "+lt['0']
										 });
								   
									  notification.onclick = function() {
										  $location.path("/tempo");
									}
								  }

								

								 
							}
							
							lt['21'] = true;
							$scope.mensagemFim = "Fim do tempo";
							
							
							
							
					}	
						
				});
				}
			
			
		},1000);
		
		
		$scope.editarTempoUsado = function(tmp){
			try{
				tempoAPI.editarTempoUsado(tmp).success(function(){
					
				}).error(function(){
				});	
			}catch(err){
				
			}
			
		};
	
		// Crud de maquinas

		$scope.listarMaquina = function(){
			maquinaAPI.listarMaquina().success(function(response){
				$timeout(function(){
					$scope.carregando = false;
					$scope.listaMaquina = response;
					console.log(response);	
				},1000);
			
			}).error(function(){
				alert("erro ao carregar a lista de maquinas");
			});
		}
		
		
		
		$scope.salvarMaquina = function(maquina) {
			 var maquinas={"numero":maquina.numero,"modelo":maquina.modelo};
			 maquinaAPI.verificarMaquina(maquina.numero,0).success(function(response){
				console.log(response);
				if(response){
				
					alert("Já existe uma maquina com esse numero, não é permitido cadastrar maquinas com numeros repetidos")

	
				}else{
					maquinaAPI.salvarMaquina(maquinas).success(function(response){
						$scope.limpaForm();
						
						$scope.loading();
						$scope.saved = true;
						$scope.listarMaquina();

						$timeout(function(){
							
						
							$scope.saved = false;
							$scope.loadingObj = false;

						},1000);
						

					}).error(function(){
						alert("Erro ao salvar maquina");

					});
				}
				 }).error(function(){
				alert("Erro ao salvar maquina")
			})
								
			
			
		};
		
		$scope.excluirMaquina = function(maquina){
			console.log(maquina.usada)
			if(maquina.usada == true){
				alert("Não pode excluir uma maquina que está sendo usada");
			}else{
				maquinaAPI.excluirMaquina(maquina.id).success(function(response){

					$scope.loading();
					$scope.drop = true;
					$scope.listarMaquina();

					$timeout(function(){

				
						$scope.drop = false;
						$scope.loadingObj = false;
					
					},1000);
				
				}).error(function(){
					alert("Erro não foi possivel remover a maquina");
				});
			}
		};
		
		$scope.editarMaquina = function(maq,id) {
			  var maquinas={"id":id,"numero":maq.numero,"modelo":maq.modelo}
		 if(maq.usada == true){
			alert("Não pode editar uma maquina que está sendo usada");
		 }else{
			  maquinaAPI.verificarMaquina(maq.numero,id).success(function(response){

				  if(response){
					
						alert("Já existe uma maquina com esse numero, não é permitido cadastrar maquinas com numeros repetidos")

		
					}else{
						maquinaAPI.editarMaquina(maquinas).success(function(response){
							$scope.limpaForm();
							$scope.loading();
							$scope.edit = true;
							$scope.listarMaquina();

							$timeout(function(){

								$scope.verifica = false;
								
								
								$scope.edit = false;
								$scope.loadingObj = false;

							},1000);
							    

							}).error(function(){
								alert("error");
							});
					}
					 			}).error(function(){
					alert("Erro ao editar maquina")
				})
									
		 }
		};
		
		// Crud de produtos
		
		$scope.listarProduto = function(){
		produtoAPI.listarProduto().success(function(response){
				$timeout(function(){
					$scope.carregando = false;
					$scope.listaProduto = response;
					console.log(response);	
				},1000);
			}).error(function(){
				alert("erro ao carregar a lista de produtos");
			});
		}
		
		
		$scope.salvarProduto = function(produto){
			var produtos = {"nome":produto.nome,"preco":produto.preco};
			produtoAPI.verificarProduto(produto.nome,0).success(function(response){
				console.log(response);
				if(response){
				
					alert("Já existe um produto com esse nome, não é permitido cadastrar produtos com nomes repetidos")

	
				}else{
					produtoAPI.salvarProduto(produtos).success(function(response){
						$scope.limpaForm();

						$scope.loading();
						$scope.saved = true;
						$scope.listarProduto();

						$timeout(function(){
						
							$scope.saved = false;
							$scope.loadingObj = false;

						},1000);
						
					}).error(function(){
						alert("Erro ao salvar produto")
					})
				}
				 			}).error(function(){
				alert("Erro ao salvar produto")
			})
								
				
		};
		
		$scope.excluirProduto = function(produto){
			produtoAPI.excluirProduto(produto.id).success(function(response){
				$scope.loading();
				$scope.drop = true;
				$scope.listarProduto();

				$timeout(function(){

				
					$scope.drop = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao remover produto");
			});
			
		}
		
		$scope.editarProduto = function(produto,id){
			var produtos={"id":id,"nome":produto.nome,"preco":produto.preco}
			
			
			produtoAPI.verificarProduto(produto.nome,id).success(function(response){
				
				if(response){
				
					alert("Já existe um produto com esse nome, não é permitido cadastrar produtos com nomes repetidos")

	
				}else{
					produtoAPI.editarProduto(produtos).success(function(response){
					     	$scope.limpaForm();
							$scope.loading();
							$scope.edit = true;
							$scope.listarProduto();

							$timeout(function(){

								$scope.verifica = false;
															
								$scope.edit = false;
								$scope.loadingObj = false;

							},1000);
						}).error(function(){
							alert("erro ao editar produto")
						});
				}
				 			}).error(function(){
				alert("Erro ao editar produto")
			})
		};
		
		
		// Crud valor da hora
		
		$scope.listarHora = function(){
			valorHoraAPI.listarHora().success(function(response){
				
				$timeout(function(){
					$scope.carregando = false;
					$scope.listaHora = response;
					valorHoraAPI.listarModelo().success(function(response){
						$scope.listaModelo = response;
					})
					console.log(response);	
				},1000);
				}).error(function(){
					("erro ao carregar lista de horas");
				})	
		
		};
		
		$scope.selectValorHora = function(modelo){
			valorHoraAPI.selectValorHora(modelo).success(function(response){
				$scope.valorHoraSelecionada = response;
			});
		};
		
		$scope.salvarHora = function(valorHora,modelo){
			var horas = {"minuto":valorHora.minuto,"preco":valorHora.preco,"modelo":modelo}
			valorHoraAPI.salvarHora(horas).success(function(){
				$scope.limpaForm();
				$scope.loading();
				$scope.saved = true;
				$scope.listarHora();

				$timeout(function(){
				
				
					$scope.saved = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao salvar nova hora")
			})
		};
		
		$scope.excluirHora = function(valorHora){
			valorHoraAPI.excluirHora(valorHora.id).success(function(){
				$scope.loading();
				$scope.drop = true;
				$scope.listarHora();

				$timeout(function(){

				
					$scope.drop = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao remover hora");
			});
			
		};
		
		$scope.editarHora = function(valorHora,id){
			var hora = {"id":id,"minuto":valorHora.minuto,"preco":valorHora.preco,"modelo":valorHora.modelo};
			valorHoraAPI.editarHora(hora).success(function(){
				$scope.limpaForm();
				$scope.loading();
				$scope.edit = true;
				$scope.listarHora();

				$timeout(function(){

					$scope.verifica = false;
					$scope.edit = false;
					$scope.loadingObj = false;

				},1000);
			}).error(function(){
				alert("erro ao editar hora");
			})
		};
		
		// crud dos tempos
		$scope.listarTempos = function(){
			tempoAPI.listarTempos().success(function(response){
				$timeout(function(){
					$scope.carregando = false;
				$scope.temposTodos = response;
				},1000);
			});
		};
		
		$scope.salvarNovoTempo = function(maqNumero,hora,livre){
			if(livre){
				var novoTempo = {"minutos":0,"valor":0,"usada":true,"tempoUsado":true};

				tempoAPI.salvarTempoLivre(maqNumero.id,novoTempo).success(function(){

					$scope.saved = true;
					location.reload();
					$scope.isTempo= !$scope.isTempo;
					location.reload();

					$timeout(function(){					
						$scope.saved = false;
						$scope.loadingObj = false;

					},1000);
				}).error(function(){
					alert("Erro ao salvar tempo livre");
				});
			}else{
			tempoAPI.verificarTempo(maqNumero.numero).success(function(response){

				if(response['0'] != null && response['0'] != undefined){
					var data = new Date();
					
					var novoTempo = {"minutos":hora.minuto,"valor":hora.preco,"usada":true,"tempoUsado":true};
					tempoAPI.salvarNovoTempo(maqNumero.id,novoTempo).success(function(response){
					
						$scope.limpaForm();
						$scope.loading();
						$scope.saved = true;
						$scope.isTempo= !$scope.isTempo;
						location.reload();

						$timeout(function(){
						
							$scope.listarTemposAtivos();
						
							$scope.saved = false;
							$scope.loadingObj = false;

						},1000);
						
					}).error(function(){
						alert("erro ao salvar novo tempo");
					})					
				}else{
				
					var tempo = {"minutos":hora.minuto,"valor":hora.preco,"usada":true,"tempoUsado":true};
					tempoAPI.salvarTempo(maqNumero.id,tempo).success(function(response){

						$scope.loading();
						$scope.saved = true;
						$scope.isTempo=!$scope.isTempo;
						location.reload();
						$timeout(function(){
							$scope.listarTemposAtivos();
						
							$scope.saved = false;
							$scope.loadingObj = false;

						},1000);
						
					}).error(function(){
							alert("erro ao salvar novo tempo");
						})
				}
			}).error(function(){
				alert("erro ao salvar novo tempo");

			});
		};
		};
		
		$scope.fecharConta = function(num,precoLivre,minutoValidador){
		
			var confirmacao = window.confirm("Deseja fechar essa conta?") 
			if(confirmacao){
				var tempo=[];
				if(minutoValidador == 0){
					if(precoLivre == null || precoLivre == undefined){
						alert("preencha o preço de tempo, na tabela de tempos ativos")
					}else{
						tempoAPI.listarTempoLivre(num).success(function(response){
						tempo = response['0'];
						var data = new Date();
						tempo['horaFim'] = data.getTime();
						tempo['minutos'] = data.getTime() - tempo['horaInicio'];
						tempo['minutos'] = tempo['minutos'] / 60000;
						tempo['valor'] = precoLivre;
						tempoAPI.salvarTempoEditado(tempo).success(function(){
							tempoAPI.fecharConta(num).success(function(){
								$scope.listarTemposAtivos();
								})
							})
						})
					}
					
				}else{
				tempoAPI.fecharConta(num).success(function(response){
					$scope.loading();
					$scope.edit = true;
					$scope.listarTemposAtivos();

					$timeout(function(){

					
						$scope.edit = false;
						$scope.loadingObj = false;

					},1000);
				}).error(function(){
					alert("erro ao fechar a conta");
				});
				}
			}
		  
		};
		
		$scope.excluirTemposAtivos = function(num){
			var confirmacao = window.confirm("Deseja excluir essa conta e os seus dados?")
			if(confirmacao){
				tempoAPI.excluirTemposAtivos(num).success(function(response){
					$scope.loading();
					$scope.drop = true;
					$scope.listarTemposAtivos();

					$timeout(function(){

					
						$scope.drop = false;
						$scope.loadingObj = false;

					},1000);
					
				}).error(function(){
				
				});
			}
		};
	
		// Vendas de Produtos nas maquinas
		
		$scope.listarVendas = function(){
			produtoAPI.listarVendas().success(function(response){
				$timeout(function(){
					$scope.carregando = false;
					$scope.vendasTodos = response;
				},1000);
			});
		};
		
		$scope.salvarVendaProduto = function(quantidade,produto){
			
				produtoAPI.salvarVendaProduto(quantidade,produto).success(function(){
					$scope.loading();
					$scope.saved = true;
					$scope.isProduto = !$scope.isProduto;
					location.reload();

					$timeout(function(){
						$scope.listarTemposAtivos();
					
						$scope.saved = false;
						$scope.loadingObj = false;

					},1000);
					
				}).error(function(){
					alert("Não foi possivel salvar a venda do produto");
				})
			
			
		};
		
		$scope.salvarVendaMaquina = function(maquina,produto,quantidade){
			maquinaAPI.salvarVendaMaquina(maquina.id,quantidade,produto).success(function(){
				$scope.loading();
				$scope.saved = true;
				$scope.isProduto = !$scope.isProduto;

				location.reload();

				$timeout(function(){
					$scope.listarTemposAtivos();
				
					$scope.saved = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("Não foi possivel salvar a venda do produto");

			})
		};
		
		$scope.mudarBtnVenda = function(maqProdSelec){
			if(maqProdSelec == undefined || maqProdSelec == null){
				$scope.btnVenda = true;
			}else{
				$scope.btnVenda = false;
			}
		};
		
		// listar tempos individuais no modal
		$scope.listarTempoIndividual = function(numero){
		   tempoAPI.listarTempoIndividual(numero).success(function(response){
				$scope.listaTempoIndividual = response;

			   $scope.listaTemposAtivos.forEach(function(lta){
				   if(lta['0'] == numero){
					   lta['9'] = $scope.listaTempoIndividual;
				   }
			   });

			}).error(function(){
				
			});
		};
	
		$scope.listarProdutoIndividual = function(numero){
			produtoAPI.listarProdutoIndividual(numero).success(function(response){
				$scope.listaProdutoIndividual = response;
				 $scope.listaTemposAtivos.forEach(function(ltp){
					   if(ltp['0'] == numero){
						   ltp['10'] = $scope.listaProdutoIndividual;
					   }
				   });
			}).error(function(){
				
			});
		};
		
		$scope.salvarTempoEditado = function(subItem,subEdit){
			var data = new Date();
			var hora = data.getTime() - subItem['horaInicio'];
			var hora = hora / 60000;
			subItem['minutos'] = subEdit.minuto - hora;
			subItem['valor'] = subEdit.preco;
			subItem['horaInicio'] = data.getTime();
			subItem['horaFim'] = data.getTime() + subItem['minutos'] * 60000;
			subItem['minutos'] = subEdit.minuto;
			
			tempoAPI.salvarTempoEditado(subItem).success(function(){

				$scope.loading();
				$scope.edit = true;
				$scope.listarTemposAtivos();
				$scope.listarTempoIndividual(subItem.maquina.numero);
				
				$timeout(function(){

								
					$scope.edit = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao salvar");

			});
		};
		
		$scope.excluirTempoIndividual = function(id,subItem){
			tempoAPI.excluirTempoIndividual(id).success(function(){
			
				$scope.loading();
				$scope.drop = true;

				$scope.listarTemposAtivos();
				try{

					$scope.listarTempoIndividual(subItem.maquina.numero);	
						
				}finally{
					console.clear();
				}
				
				$timeout(function(){
			
					$scope.drop = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao excluir");

			});
		};
		
		$scope.excluirTempoHistorico = function(id){
			tempoAPI.excluirTempoIndividual(id).success(function(){
				$scope.listarTempos();
				$scope.loadingObj = true;
				$scope.drop = true;
				
			$timeout(function(){
				$scope.drop = false;
				$scope.loadingObj = false;
			},1000);	
			}).error(function(){
				alert("não foi possivel excluir o tempo");
			});
		};
		
		$scope.salvarProdutoEditado = function(subItem,subEdit){
			subItem['quantidade'] = subEdit.quantidade;
			subItem['precoTotal'] = subItem['preco'] * subItem['quantidade'];
			
			 produtoAPI.salvarProdutoEditado(subItem).success(function(){
				
				$scope.loading();
				$scope.edit = true;

				$scope.listarTemposAtivos();
				$scope.listarProdutoIndividual(subItem.maquina.numero);	
				
				$timeout(function(){
			
					$scope.edit = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao salvar");

			});
		};
	
		
		$scope.excluirProdutoIndividual = function(id,subItem){
			produtoAPI.excluirProdutoIndividual(id).success(function(){
				
				$scope.loading();
				$scope.drop = true;
				$scope.listarTemposAtivos();
				try{
					$scope.listarProdutoIndividual(subItem.maquina.numero);		
				}finally{
					console.clear();
				};
				
				
				$timeout(function(){

					
					$scope.drop = false;
					$scope.loadingObj = false;

				},1000);
				
			}).error(function(){
				alert("erro ao excluir produto");
			});
		};
		
		$scope.excluirProdutoHistorico = function(id){
			$scope.loadingObj = true;
			produtoAPI.excluirProdutoIndividual(id).success(function(){
				$scope.listarVendas();
				$scope.drop = true;
				$timeout(function(){

					
					$scope.drop = false;
					$scope.loadingObj = false;

				},1000);
			}).error(function(){
				alert("não foi possivel excluir a venda")
			});
		};
		
		$scope.fecharFormulario = function(formulario,nome){
			if(formulario == "tempo"){
				$scope.isTempo = !$scope.isTempo;
			}else if(formulario=="produto"){
				$scope.isProduto = !$scope.isProduto;

			}
		};
		
		$scope.pagamentoTempo = function(idTempo){
			var confirmacao = window.confirm("Deseja confirmar este pagamento?");
			if(confirmacao){
				tempoAPI.pagamentoTempo(idTempo).success(function(response){
					$scope.listarTemposAtivos();
					$scope.listarVendas();
					$scope.listarTempos();
				});
			}
		};
		
		$scope.pagamentoVenda = function(idProduto){
			var confirmacao = window.confirm("Deseja confirmar este pagamento?");
			if(confirmacao){
				produtoAPI.pagamentoVenda(idProduto).success(function(response){
					$scope.listarTemposAtivos();
					$scope.listarVendas();
					$scope.listarTempos();
				});
			}
		};
		
		$scope.limpaForm = function(){
				$scope.maquina.modelo = null;
		    	$scope.maquina.numero = null;
		    	$scope.produto.nome = null;
				$scope.produto.preco = null;
				$scope.valorHora.minuto = null;
				$scope.valorHora.preco = null;
				$scope.maq.numero = null;
				$scope.maq.modelo = null;
				$scope.prod.nome = null;
				$scope.prod.preco = null;
				$scope.listaModelo = null;
				$scope.v.minuto = null;	
				$scope.v.modelo = null;
				$scope.v.preco = null;
		
		};
		
		$scope.enviarMensagem = function(tipo,mensagem){
			mensagem={
				"tipo":tipo,
				"mensagem":mensagem
			};
			$http.post('https://api.backendless.com/v1/data/Mensagem',mensagem,{
				headers:{
					'application-id': '22D65F41-8019-CAC2-FFC1-CF54E1C31200',
					'secret-key'    : '75CBD4A0-E41C-2AD0-FF07-C792F3B1DA00',
					'Content-Type':'application/json'
				}
			}).success(function(){
				$scope.tipos=["Sugestão","Critica","Erro","Dúvida"];	
				$scope.tipoSelecionado=null;
				$scope.infoErro=null;
				alert("Enviada com sucesso!")
			}).error(function(){
				alert("Não foi possivel enviar a mensagem tente novamente mais tarde!")
			});
		};
	
		$scope.addListaVenda = function(prod,qtd){
			$scope.listaVendaTemporaria=[];
				
			if($cookieStore.get('listaCookie') != null){
				$scope.listaVendaTemporaria = JSON.parse($cookieStore.get('listaCookie'));
			}
			prod['quantidade'] = qtd;
			$scope.listaVendaTemporaria.push(prod);
			$cookieStore.put('listaCookie',JSON.stringify($scope.listaVendaTemporaria));
			$scope.listarCookie();
			
		};
		$scope.listarCookie = function(){
			var resultadoParcial=0;
			var somaTotal=0;
			if($cookieStore.get('listaCookie') != null){
				$scope.listaVendaTemporaria = JSON.parse($cookieStore.get('listaCookie'));

				$scope.listaVendaTemporaria.forEach(function(lvt){
					resultadoParcial = lvt.quantidade * lvt.preco;
					somaTotal += resultadoParcial;
				});
			}
			
			
			$scope.valorTotal = somaTotal;
		};
		$scope.cancelarVenda = function(){
			$scope.listaVendaTemporaria=[];
			$cookieStore.remove('listaCookie');
			$scope.listarCookie();
		};
		
		// carregar dados para edição nos inputs
		$scope.carregarEditarProd = function(p){
			$scope.prod = p;
		};
		$scope.carregarEditarMaq= function(m){
			$scope.maq = m;
		};
		$scope.carregarEditarValor= function(vh){
			$scope.v = vh;
		}
		$scope.carregarEditTempInd= function(l){
			$scope.lt = l;
		}
		$scope.trocarTab = function(booleano){
			$scope.classeAtiva = booleano;
		};
		$scope.listasCarregadas= function(){
			$scope.url = $location.url();

			if($scope.url == "/tempo"){
				$scope.listarTemposAtivos();
			}else if($scope.url == "/historico-produtos"){
				$scope.listarVendas();
			}else if($scope.url == "/historico-tempos"){
				$scope.listarTempos();
			}
	
			$scope.listarProduto();
			$scope.listarMaquina();
			$scope.listarHora();
		}
	
		$scope.listarCookie();
		$scope.listasCarregadas();
	
	});

