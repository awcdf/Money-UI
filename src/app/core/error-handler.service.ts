import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }

  handler(errorResponse: any) {
      let mensagem: string;

      if(typeof errorResponse === 'string') {
        mensagem = errorResponse;

      } else if (errorResponse instanceof NotAuthenticatedError) {
        mensagem = 'Sua sessão expirou!!';
        this.router.navigate(['/login']);
      }

      else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499){
        mensagem = 'Ocorreu um erro ao processar a sua solicitação';

        if (errorResponse.status === 403) {
          mensagem = 'Você não tem permissão para executar esta ação!'
        }

        try {
          mensagem = errorResponse.error[0].mensagemUsuario;
        } catch (error) {
          console.error('Ocorreu um erro', errorResponse);
        }

      } else {
        mensagem = 'Erro ao processar serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
      }
      this.messageService.add({ severity: 'error', detail: mensagem});
  }
}
