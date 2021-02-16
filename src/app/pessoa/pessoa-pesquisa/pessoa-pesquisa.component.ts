import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFiltro  } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})

export class PessoaPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas = [];
  totalElements = 5;
  totalPages = 0;
  @ViewChild('tabela') grid: any;

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas')
  }

  pesquisar(page = 0) {
    this.filtro.page = page;
    this.pessoaService.pesquisar(this.filtro)
    .then(response => {
      this.totalElements = response.totalElements,
      this.totalPages = response.totalPages,
      this.pessoas = response.content
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const rowsEvent = event.rows + '';
    const firtsEvent = event.first + '';

    const rows = parseInt(rowsEvent);
    const firts = parseInt(firtsEvent);

    const page = firts/rows;

    this.pesquisar(page);
  }

  confirmarExcluir(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      this.grid.reset();
      this.messageService.add({ severity: 'success', detail: 'Pessoa excluida com sucesso!'});
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

  alterarStatus(pessoa: Pessoa){
    const newStatus = !pessoa.ativo;
    const msgStatus = pessoa.ativo == true ? 'Ativo' : 'Inativo';
    this.pessoaService.alterarStatus(pessoa)
    .then(() => {
      pessoa.ativo = newStatus;
      this.messageService.add({ severity: 'success', detail: `Pessoa ${msgStatus} com sucesso!` });
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

}
