"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoaRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("../seguranca/auth.guard");
var pessoa_cadastro_component_1 = require("./pessoa-cadastro/pessoa-cadastro.component");
var pessoa_pesquisa_component_1 = require("./pessoa-pesquisa/pessoa-pesquisa.component");
var routes = [
    {
        path: 'pessoas',
        component: pessoa_pesquisa_component_1.PessoaPesquisaComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
    },
    {
        path: 'pessoas/nova',
        component: pessoa_cadastro_component_1.PessoaCadastroComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    },
    {
        path: 'pessoas/:codigo',
        component: pessoa_cadastro_component_1.PessoaCadastroComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
    },
];
var PessoaRoutingModule = /** @class */ (function () {
    function PessoaRoutingModule() {
    }
    PessoaRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [router_1.RouterModule]
        })
    ], PessoaRoutingModule);
    return PessoaRoutingModule;
}());
exports.PessoaRoutingModule = PessoaRoutingModule;
