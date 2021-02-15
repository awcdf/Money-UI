"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LancamentosModule = void 0;
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var lancamento_cadastro_component_1 = require("./lancamento-cadastro/lancamento-cadastro.component");
var lancamento_pesquisa_component_1 = require("./lancamento-pesquisa/lancamento-pesquisa.component");
var shared_module_1 = require("./../shared/shared.module");
var selectbutton_1 = require("primeng/selectbutton");
var calendar_1 = require("primeng/calendar");
var inputtext_1 = require("primeng/inputtext");
var tooltip_1 = require("primeng/tooltip");
var button_1 = require("primeng/button");
var dropdown_1 = require("primeng/dropdown");
var inputnumber_1 = require("primeng/inputnumber");
var inputmask_1 = require("primeng/inputmask");
var table_1 = require("primeng/table");
var inputtextarea_1 = require("primeng/inputtextarea");
var lancamento_routing_module_1 = require("./lancamento-routing.module");
var LancamentosModule = /** @class */ (function () {
    function LancamentosModule() {
    }
    LancamentosModule = __decorate([
        core_1.NgModule({
            declarations: [
                lancamento_cadastro_component_1.LancamentoCadastroComponent,
                lancamento_pesquisa_component_1.LancamentosPesquisaComponent,
            ],
            exports: [],
            imports: [
                common_1.CommonModule,
                dropdown_1.DropdownModule,
                inputnumber_1.InputNumberModule,
                inputmask_1.InputMaskModule,
                forms_1.FormsModule,
                inputtextarea_1.InputTextareaModule,
                button_1.ButtonModule,
                selectbutton_1.SelectButtonModule,
                calendar_1.CalendarModule,
                inputtext_1.InputTextModule,
                table_1.TableModule,
                tooltip_1.TooltipModule,
                animations_1.BrowserAnimationsModule,
                shared_module_1.SharedModule,
                http_1.HttpClientModule,
                lancamento_routing_module_1.LancamentoRoutingModule
            ]
        })
    ], LancamentosModule);
    return LancamentosModule;
}());
exports.LancamentosModule = LancamentosModule;
