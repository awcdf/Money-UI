"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorHandlerService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var money_http_interceptor_1 = require("../seguranca/money-http-interceptor");
var ErrorHandlerService = /** @class */ (function () {
    function ErrorHandlerService(messageService, router) {
        this.messageService = messageService;
        this.router = router;
    }
    ErrorHandlerService.prototype.handler = function (errorResponse) {
        var mensagem;
        if (typeof errorResponse === 'string') {
            mensagem = errorResponse;
        }
        else if (errorResponse instanceof money_http_interceptor_1.NotAuthenticatedError) {
            mensagem = 'Sua sessão expirou!!';
            this.router.navigate(['/login']);
        }
        else if (errorResponse instanceof http_1.HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
            mensagem = 'Ocorreu um erro ao processar a sua solicitação';
            if (errorResponse.status === 403) {
                mensagem = 'Você não tem permissão para executar esta ação!';
            }
            try {
                mensagem = errorResponse.error[0].mensagemUsuario;
            }
            catch (error) {
                console.error('Ocorreu um erro', errorResponse);
            }
        }
        else {
            mensagem = 'Erro ao processar serviço remoto. Tente novamente.';
            console.error('Ocorreu um erro', errorResponse);
        }
        this.messageService.add({ severity: 'error', detail: mensagem });
    };
    ErrorHandlerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ErrorHandlerService);
    return ErrorHandlerService;
}());
exports.ErrorHandlerService = ErrorHandlerService;
