import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  totalElements = 0;
  totalPages = 0;
  @ViewChild('tabela') grid: any;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lancamentos');
  }

  pesquisar(page = 0) {
       this.filtro.page = page;
       this.lancamentoService.pesquisar(this.filtro)
    .then(response => {
        this.totalElements = response.totalElements,
        this.totalPages = response.totalPages,
        this.lancamentos = response.content
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

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }
  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      this.grid.reset();
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluido com sucesso!'});
    }).catch(erro => this.errorHandlerService.handler(erro));
  }
}
