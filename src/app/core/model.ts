export class Pessoa {
  codigo!: number;
  nome!: string;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();
}

export class Categoria {
  codigo!: number;
}

export class Lancamento {
  codigo!: number;
  tipo: string = 'RECEITA';
  descricao!: string;
  dataVencimento!: string;
  dataPagamento!: string;
  valor: number = 0;
  observacao!: string;
  pessoa: Pessoa = new Pessoa();
  categoria: Categoria = new Categoria();
}

export class Endereco {
  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;
}
