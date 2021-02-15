"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoaPesquisaComponent = void 0;
var pessoa_service_1 = require("./../pessoa.service");
var core_1 = require("@angular/core");
var PessoaPesquisaComponent = /** @class */ (function () {
    function PessoaPesquisaComponent(pessoaService, errorHandlerService, messageService, confirmationService, title, auth) {
        this.pessoaService = pessoaService;
        this.errorHandlerService = errorHandlerService;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.title = title;
        this.auth = auth;
        this.filtro = new pessoa_service_1.PessoaFiltro();
        this.pessoas = [];
        this.totalElements = 5;
        this.totalPages = 0;
    }
    PessoaPesquisaComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Pesquisa de Pessoas');
    };
    PessoaPesquisaComponent.prototype.pesquisar = function (page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        this.filtro.page = page;
        this.pessoaService.pesquisar(this.filtro)
            .then(function (response) {
            _this.totalElements = response.totalElements,
                _this.totalPages = response.totalPages,
                _this.pessoas = response.content,
                console.log(response);
        })["catch"](function (erro) { return _this.errorHandlerService.handler(erro); });
    };
    PessoaPesquisaComponent.prototype.aoMudarPagina = function (event) {
        var rowsEvent = event.rows + '';
        var firtsEvent = event.first + '';
        var rows = parseInt(rowsEvent);
        var firts = parseInt(firtsEvent);
        var page = firts / rows;
        this.pesquisar(page);
    };
    PessoaPesquisaComponent.prototype.confirmarExcluir = function (pessoa) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: function () {
                _this.excluir(pessoa);
            }
        });
    };
    PessoaPesquisaComponent.prototype.excluir = function (pessoa) {
        var _this = this;
        this.pessoaService.excluir(pessoa.codigo)
            .then(function () {
            _this.grid.reset();
            _this.messageService.add({ severity: 'success', detail: 'Pessoa excluida com sucesso!' });
        })["catch"](function (erro) { return _this.errorHandlerService.handler(erro); });
    };
    PessoaPesquisaComponent.prototype.alterarStatus = function (pessoa) {
        var _this = this;
        var newStatus = !pessoa.ativo;
        var msgStatus = pessoa.ativo == true ? 'Ativo' : 'Inativo';
        this.pessoaService.alterarStatus(pessoa)
            .then(function () {
            pessoa.ativo = newStatus;
            _this.messageService.add({ severity: 'success', detail: "Pessoa " + msgStatus + " com sucesso!" });
        })["catch"](function (erro) { return _this.errorHandlerService.handler(erro); });
    };
    __decorate([
        core_1.ViewChild('tabela')
    ], PessoaPesquisaComponent.prototype, "grid");
    PessoaPesquisaComponent = __decorate([
        core_1.Component({
            selector: 'app-pessoa-pesquisa',
            templateUrl: './pessoa-pesquisa.component.html',
            styleUrls: ['./pessoa-pesquisa.component.css']
        })
    ], PessoaPesquisaComponent);
    return PessoaPesquisaComponent;
}());
exports.PessoaPesquisaComponent = PessoaPesquisaComponent;
