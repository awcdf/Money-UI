"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LancamentosPesquisaComponent = void 0;
var lancamento_service_1 = require("./../lancamento.service");
var core_1 = require("@angular/core");
var LancamentosPesquisaComponent = /** @class */ (function () {
    function LancamentosPesquisaComponent(lancamentoService, messageService, confirmationService, errorHandlerService, title) {
        this.lancamentoService = lancamentoService;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.errorHandlerService = errorHandlerService;
        this.title = title;
        this.filtro = new lancamento_service_1.LancamentoFiltro();
        this.lancamentos = [];
        this.totalElements = 0;
        this.totalPages = 0;
    }
    LancamentosPesquisaComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Pesquisa de Lancamentos');
    };
    LancamentosPesquisaComponent.prototype.pesquisar = function (page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        this.filtro.page = page;
        this.lancamentoService.pesquisar(this.filtro)
            .then(function (response) {
            _this.totalElements = response.totalElements,
                _this.totalPages = response.totalPages,
                _this.lancamentos = response.content;
        })["catch"](function (erro) { return _this.errorHandlerService.handler(erro); });
    };
    LancamentosPesquisaComponent.prototype.aoMudarPagina = function (event) {
        var rowsEvent = event.rows + '';
        var firtsEvent = event.first + '';
        var rows = parseInt(rowsEvent);
        var firts = parseInt(firtsEvent);
        var page = firts / rows;
        this.pesquisar(page);
    };
    LancamentosPesquisaComponent.prototype.confirmarExclusao = function (lancamento) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: function () {
                _this.excluir(lancamento);
            }
        });
    };
    LancamentosPesquisaComponent.prototype.excluir = function (lancamento) {
        var _this = this;
        this.lancamentoService.excluir(lancamento.codigo)
            .then(function () {
            _this.grid.reset();
            _this.messageService.add({ severity: 'success', detail: 'Lançamento excluido com sucesso!' });
        })["catch"](function (erro) { return _this.errorHandlerService.handler(erro); });
    };
    __decorate([
        core_1.ViewChild('tabela')
    ], LancamentosPesquisaComponent.prototype, "grid");
    LancamentosPesquisaComponent = __decorate([
        core_1.Component({
            selector: 'app-lancamento-pesquisa',
            templateUrl: './lancamento-pesquisa.component.html',
            styleUrls: ['./lancamento-pesquisa.component.css']
        })
    ], LancamentosPesquisaComponent);
    return LancamentosPesquisaComponent;
}());
exports.LancamentosPesquisaComponent = LancamentosPesquisaComponent;
