"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LancamentoService = exports.LancamentoFiltro = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var date_fns_1 = require("date-fns");
var environment_1 = require("src/environments/environment");
var LancamentoFiltro = /** @class */ (function () {
    function LancamentoFiltro() {
        this.descricao = '';
        this.dataVencimentoDe = '';
        this.dataVencimentoAte = '';
        this.page = 0;
        this.sizePage = 5;
    }
    return LancamentoFiltro;
}());
exports.LancamentoFiltro = LancamentoFiltro;
var LancamentoService = /** @class */ (function () {
    function LancamentoService(http) {
        this.http = http;
        this.lancamentosUrl = environment_1.environment.apiUrl + "/lancamento";
    }
    LancamentoService.prototype.pesquisar = function (filtro) {
        var params = new http_1.HttpParams();
        params = params.set('size', filtro.sizePage);
        params = params.set('page', filtro.page);
        if (filtro.descricao) {
            params = params.set('descricao', filtro.descricao);
        }
        if (filtro.dataVencimentoDe) {
            params = params.set('dataVencimentoDe', date_fns_1.format(filtro.dataVencimentoDe, 'dd/MM/yyyy'));
        }
        if (filtro.dataVencimentoAte) {
            params = params.set('dataVencimentoAte', date_fns_1.format(filtro.dataVencimentoAte, 'dd/MM/yyyy'));
        }
        return this.http.get(this.lancamentosUrl + "?resumo", { params: params })
            .toPromise()
            .then(function (response) { return response; });
    };
    LancamentoService.prototype.excluir = function (codigo) {
        return this.http["delete"](this.lancamentosUrl + "/" + codigo)
            .toPromise()
            .then(function () { return null; });
    };
    LancamentoService.prototype.adicionar = function (lancamento) {
        return this.http.post(this.lancamentosUrl, lancamento)
            .toPromise()
            .then(function (response) { return response; });
    };
    LancamentoService.prototype.buscarPorCodigo = function (codigo) {
        return this.http.get(this.lancamentosUrl + "/" + codigo)
            .toPromise()
            .then(function (response) { return response; });
    };
    LancamentoService.prototype.atualizar = function (lancamento) {
        return this.http.put(this.lancamentosUrl + "/" + lancamento.codigo, lancamento)
            .toPromise()
            .then(function (response) { return response; });
    };
    LancamentoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LancamentoService);
    return LancamentoService;
}());
exports.LancamentoService = LancamentoService;
