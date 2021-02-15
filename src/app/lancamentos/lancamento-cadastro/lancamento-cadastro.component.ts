import { Title } from '@angular/platform-browser';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoa/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categoria/categoria.service';

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { format, parse } from  'date-fns';

import { Lancamento } from 'src/app/core/model';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Dispesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  dataVencimento!: Date;
  dataPagamento!: Date;
  lancamento = new Lancamento();
  tipoLancamento!: boolean;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ){}

  ngOnInit(){
    this.title.setTitle('Novo Lancamento');
    this.carregarLancamento(this.route.snapshot.params.codigo);
    this.carregarCategoria();
    this.carregarPessoas();
  }

  carregarLancamento(codigo: any) {
    if(codigo != undefined) {
      let codigo: number = parseInt(this.route.snapshot.params.codigo);
      if(!codigo) {
        this.errorHandlerService.handler('Codigo Invalido!');
      } else {
        this.tipoLancamento = true;
        this.buscarLancamento(codigo);
      }
    }
  }

  buscarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      if(lancamento != null) {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
        this.transformaStringemData(lancamento);
      } else {
        this.errorHandlerService.handler('Codigo Invalido!!')
      }
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

  transformaStringemData(lancamento: Lancamento){
  if(lancamento.dataPagamento != null) {
    this.dataPagamento = parse(lancamento.dataPagamento, 'dd/MM/yyyy', new Date());
  }
   this.dataVencimento = parse(lancamento.dataVencimento, 'dd/MM/yyyy', new Date());
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas()
    .then(pessoa => {
      this.pessoas = pessoa.content.map(p => ({ label: p.nome, value: p.codigo}));
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

  carregarCategoria(){
    return this.categoriaService.listarTodas()
    .then(categoria => {
      this.categorias = categoria.map(ct => ({ label: ct.nome, value: ct.codigo}));
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if(this.dataPagamento != null) {
      this.lancamento.dataPagamento = format(this.dataPagamento, 'dd/MM/yyyy');
    }
    this.lancamento.dataVencimento = format(this.dataVencimento, 'dd/MM/yyyy');


    if(this.lancamento.codigo != null) {
      if(this.dataPagamento == null) {
        this.lancamento.dataPagamento = '';
      }
      this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento =>{
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
        this.messageService.add({severity: 'success', detail: 'Lancamento atualizado com sucesso!'});
      }).catch(erro => this.errorHandlerService.handler(erro));

    } else {
      this.lancamentoService.adicionar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.messageService.add({ severity: 'success', detail: 'Lancamento efetuado com sucesso!'});
        this.router.navigate(['/lancamentos', lancamento.codigo])
      }).catch(erro => this.errorHandlerService.handler(erro));
    }
  }

  novo(form: FormControl) {
    this.router.navigate(['/lancamentos/novo']);
    form.reset(new Lancamento());
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Lancamento: ${this.lancamento.descricao}`)
  }
}
