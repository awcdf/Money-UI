"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MoneyHttpInterceptor = exports.NotAuthenticatedError = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var NotAuthenticatedError = /** @class */ (function () {
    function NotAuthenticatedError() {
    }
    return NotAuthenticatedError;
}());
exports.NotAuthenticatedError = NotAuthenticatedError;
var MoneyHttpInterceptor = /** @class */ (function () {
    function MoneyHttpInterceptor(auth) {
        this.auth = auth;
    }
    MoneyHttpInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
            return rxjs_1.from(this.auth.obterNovoAccessToken())
                .pipe(operators_1.mergeMap(function () {
                if (_this.auth.isAccessTokenInvalido()) {
                    throw new NotAuthenticatedError();
                }
                req = req.clone({
                    setHeaders: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                });
                return next.handle(req);
            }));
        }
        return next.handle(req);
    };
    MoneyHttpInterceptor = __decorate([
        core_1.Injectable()
    ], MoneyHttpInterceptor);
    return MoneyHttpInterceptor;
}());
exports.MoneyHttpInterceptor = MoneyHttpInterceptor;
