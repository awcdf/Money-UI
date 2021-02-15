"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoaService = exports.PessoaFiltro = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/environments/environment");
var PessoaFiltro = /** @class */ (function () {
    function PessoaFiltro() {
        this.nome = '';
        this.page = 0;
        this.sizePage = 5;
    }
    return PessoaFiltro;
}());
exports.PessoaFiltro = PessoaFiltro;
var PessoaService = /** @class */ (function () {
    function PessoaService(http) {
        this.http = http;
        this.pessoaUrl = environment_1.environment.apiUrl + "/pessoa";
    }
    PessoaService.prototype.pesquisar = function (filtro) {
        var params = new http_1.HttpParams();
        params = params.set('size', filtro.sizePage);
        params = params.set('page', filtro.page);
        if (filtro.nome) {
            params = params.set('nome', filtro.nome);
        }
        return this.http.get(this.pessoaUrl, { params: params })
            .toPromise()
            .then(function (response) { return response; });
    };
    PessoaService.prototype.listarTodas = function () {
        return this.http.get(this.pessoaUrl)
            .toPromise()
            .then(function (response) { return response; });
    };
    PessoaService.prototype.excluir = function (codigo) {
        return this.http["delete"](this.pessoaUrl + "/" + codigo)
            .toPromise()
            .then(function () { return null; });
    };
    PessoaService.prototype.alterarStatus = function (pessoa) {
        var headers = new http_1.HttpHeaders()
            .append('Content-Type', 'application/json');
        return this.http.put(this.pessoaUrl + "/" + pessoa.codigo + "/ativo", pessoa.ativo == true ? 'false' : 'true', { headers: headers })
            .toPromise()
            .then(function () { return null; });
    };
    PessoaService.prototype.adcionar = function (pessoa) {
        return this.http.post(this.pessoaUrl, pessoa)
            .toPromise()
            .then(function (response) { return response; });
    };
    PessoaService.prototype.buscarPeloCodigo = function (codigo) {
        return this.http.get(this.pessoaUrl + "/" + codigo)
            .toPromise()
            .then(function (response) { return response; });
    };
    PessoaService.prototype.Atualiza = function (pessoa) {
        return this.http.put(this.pessoaUrl + "/" + pessoa.codigo, pessoa)
            .toPromise()
            .then(function (response) { return response; });
    };
    PessoaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PessoaService);
    return PessoaService;
}());
exports.PessoaService = PessoaService;
