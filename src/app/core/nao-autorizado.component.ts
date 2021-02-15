import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrata',
  template: `
   <div class="container">
      <h1 class="text-center">Acesso negado!</h1>
   </div>
  `,
  styles: [
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
