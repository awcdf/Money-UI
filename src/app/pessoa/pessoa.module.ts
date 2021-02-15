import { PessoaRoutingModule } from './pessoa-routing.modules';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { SharedModule } from './../shared/shared.module';

import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    PessoaPesquisaComponent,
    PessoaCadastroComponent,
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
    RouterModule,
    PessoaRoutingModule

  ]
})
export class PessoaModule { }
