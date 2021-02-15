import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { format } from  'date-fns';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';

export class LancamentoFiltro {
  descricao: string = '';
  dataVencimentoDe: string = '';
  dataVencimentoAte: string = '';
  page: number = 0;
  sizePage: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl!: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamento`;
  }

  pesquisar(filtro: any): Promise<any> {
    let params = new HttpParams();
      params = params.set('size', filtro.sizePage);
      params = params.set('page', filtro.page);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', format(filtro.dataVencimentoDe, 'dd/MM/yyyy'));
    }

    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', format(filtro.dataVencimentoAte, 'dd/MM/yyyy'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento>{
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => response);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
      .then(response => response);
  }

}
