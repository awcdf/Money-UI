"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoriaService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var CategoriaService = /** @class */ (function () {
    function CategoriaService(http) {
        this.http = http;
        this.categoriaUrl = environment_1.environment.apiUrl + "/categorias";
    }
    CategoriaService.prototype.listarTodas = function () {
        return this.http.get(this.categoriaUrl)
            .toPromise()
            .then(function (response) { return response; });
    };
    CategoriaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoriaService);
    return CategoriaService;
}());
exports.CategoriaService = CategoriaService;
