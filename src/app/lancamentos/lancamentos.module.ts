import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { SharedModule } from './../shared/shared.module';

import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LancamentoRoutingModule } from './lancamento-routing.module';



@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent,
  ],
  exports: [],

  imports: [
    CommonModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    LancamentoRoutingModule
  ]
})
export class LancamentosModule { }
