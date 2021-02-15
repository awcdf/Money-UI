import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrata',
  template: `
   <div class="container">
      <h1 class="text-center">Página não encontrada!</h1>
   </div>
  `,
  styles: [
  ]
})
export class PaginaNaoEncontrataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
