"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var nao_autorizado_component_1 = require("./nao-autorizado.component");
var angular_jwt_1 = require("@auth0/angular-jwt");
var router_1 = require("@angular/router");
var error_handler_service_1 = require("./error-handler.service");
var lancamento_service_1 = require("../lancamentos/lancamento.service");
var pessoa_service_1 = require("../pessoa/pessoa.service");
var auth_service_1 = require("../seguranca/auth.service");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var pt_1 = require("@angular/common/locales/pt");
var common_2 = require("@angular/common");
var toast_1 = require("primeng/toast");
var confirmdialog_1 = require("primeng/confirmdialog");
var api_1 = require("primeng/api");
var navbar_component_1 = require("./navbar/navbar.component");
var pagina_nao_encontrata_component_1 = require("./pagina-nao-encontrata.component");
var platform_browser_1 = require("@angular/platform-browser");
common_2.registerLocaleData(pt_1["default"]);
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            declarations: [
                navbar_component_1.NavbarComponent,
                pagina_nao_encontrata_component_1.PaginaNaoEncontrataComponent,
                nao_autorizado_component_1.NaoAutorizadoComponent
            ],
            exports: [
                navbar_component_1.NavbarComponent,
                toast_1.ToastModule,
                confirmdialog_1.ConfirmDialogModule
            ],
            imports: [
                common_1.CommonModule,
                toast_1.ToastModule,
                confirmdialog_1.ConfirmDialogModule,
                router_1.RouterModule,
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: 'pt' },
                error_handler_service_1.ErrorHandlerService,
                lancamento_service_1.LancamentoService,
                pessoa_service_1.PessoaService,
                api_1.MessageService,
                api_1.ConfirmationService,
                platform_browser_1.Title,
                auth_service_1.AuthService,
                angular_jwt_1.JwtHelperService
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
