import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private outh: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router

  ) { }

  login(usuario: string, senha: string) {
    this.outh.login(usuario, senha)
    .then(() => {
      this.router.navigate(['/lancamentos']);
    })
    .catch(erro => {
      this.errorHandlerService.handler(erro);
    })
  }

}
