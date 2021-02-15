import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string = '';
  page: number = 0;
  sizePage: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl!: string;

  constructor(private http: HttpClient) {
    this.pessoaUrl = `${environment.apiUrl}/pessoa`;
  }

  pesquisar(filtro: any): Promise<any> {
      let params = new HttpParams();

      params = params.set('size', filtro.sizePage);
      params = params.set('page', filtro.page);

      if (filtro.nome) {
        params = params.set('nome', filtro.nome);
    }

    return this.http.get(this.pessoaUrl, { params })
      .toPromise()
      .then(response => response);
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoaUrl)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  alterarStatus(pessoa: Pessoa){
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoaUrl}/${pessoa.codigo}/ativo`, pessoa.ativo == true ? 'false' : 'true', { headers })
      .toPromise()
      .then(() => null);
  }

  adcionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaUrl, pessoa)
      .toPromise()
      .then(response => response);
  }

  buscarPeloCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(response => response);
  }

  Atualiza(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => response);
  }

}
