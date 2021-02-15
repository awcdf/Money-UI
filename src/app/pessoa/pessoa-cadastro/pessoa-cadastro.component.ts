import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  constructor(
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  pessoa = new Pessoa();
  tipoPessoa: boolean = false;

  ngOnInit () {
    this.title.setTitle('Nova Pessoa')
    this.carregarPessoa(this.route.snapshot.params.codigo);
  }

  carregarPessoa(codigo: any) {
    if(codigo != undefined) {
      let codigo: number = parseInt(this.route.snapshot.params.codigo);
      if(!codigo) {
        this.errorHandlerService.handler('Codigo Invalido!');
      } else {
        this.tipoPessoa = true;
        this.buscarLancamento(codigo);
      }
    }
  }

  buscarLancamento(codigo: number) {
    this.pessoaService.buscarPeloCodigo(codigo)
    .then(pessoa => {
      if(pessoa != null) {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      } else {
        this.errorHandlerService.handler('Codigo Invalido!!')
      }
    }).catch(erro => this.errorHandlerService.handler(erro));
  }

  salvar(form: FormControl) {
    if(this.pessoa.codigo != null) {
      this.pessoaService.Atualiza(this.pessoa)
      .then(pessoa => {
          this.pessoa = pessoa;
          this.atualizarTituloEdicao();

          this.messageService.add({severity: 'success', detail: 'Pessoa atualizada com Sucesso!'});
      }).catch(erro => this.errorHandlerService.handler(erro));
    } else {
      this.pessoaService.adcionar(this.pessoa)
      .then(pessoa => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso!'});
        this.router.navigate(['/pessoas', pessoa.codigo]);
      }).catch(erro => this.errorHandlerService.handler(erro));
    }
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Lancamento: ${this.pessoa.nome}`)
  }

  novo(form: FormControl) {
    this.router.navigate(['/pessoas/nova']);
    form.reset();
    this.pessoa = new Pessoa();
  }
}
