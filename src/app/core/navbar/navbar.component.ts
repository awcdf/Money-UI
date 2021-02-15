import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    public auth: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ){}

  ngOnInit() {

  }

  logaut() {
    this.auth.logout()
      .then(() => {
      this.router.navigate(['/login']);
    }
    ).catch(error => this.errorHandlerService.handler(error));
  }

  novoToken() {
    this.auth.obterNovoAccessToken();
  }

  exibindoMenu = false;

}
