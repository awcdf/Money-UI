"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SegurancaModule = exports.jwtTokenGetter = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var login_form_component_1 = require("./login-form/login-form.component");
var seguranca_routing_module_1 = require("./seguranca-routing.module");
var inputtext_1 = require("primeng/inputtext");
var button_1 = require("primeng/button");
var forms_1 = require("@angular/forms");
var angular_jwt_1 = require("@auth0/angular-jwt");
var http_1 = require("@angular/common/http");
var money_http_interceptor_1 = require("./money-http-interceptor");
var auth_guard_1 = require("./auth.guard");
var environment_1 = require("src/environments/environment");
function jwtTokenGetter() {
    return localStorage.getItem('token');
}
exports.jwtTokenGetter = jwtTokenGetter;
var SegurancaModule = /** @class */ (function () {
    function SegurancaModule() {
    }
    SegurancaModule = __decorate([
        core_1.NgModule({
            declarations: [login_form_component_1.LoginFormComponent],
            imports: [
                common_1.CommonModule,
                seguranca_routing_module_1.SegurancaRoutingModule,
                inputtext_1.InputTextModule,
                button_1.ButtonModule,
                forms_1.FormsModule,
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: jwtTokenGetter,
                        allowedDomains: ['localhost:8080'],
                        disallowedRoutes: [environment_1.environment.apiUrl + "/oauth/token"]
                    }
                })
            ],
            providers: [
                angular_jwt_1.JwtHelperService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: money_http_interceptor_1.MoneyHttpInterceptor,
                    multi: true
                },
                auth_guard_1.AuthGuard
            ],
            exports: []
        })
    ], SegurancaModule);
    return SegurancaModule;
}());
exports.SegurancaModule = SegurancaModule;
