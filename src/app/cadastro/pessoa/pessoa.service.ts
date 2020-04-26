import { Injectable } from '@angular/core';
import { Pessoa } from '../../comum/entidade/modelo/pessoa';
import { PessoaFiltro } from '../../comum/entidade/filtro/pessoa-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends ServicoCrudService<Pessoa, PessoaFiltro> {

  constructor() {
    super('cadastro/pessoa');
    this.lista.push({ id: 1, nome: 'Teste A', tipo: "PF", cpfCnpj: '123.456.789-11' } as Pessoa);
    this.lista.push({ id: 2, nome: 'Teste B', tipo: "PF", cpfCnpj: '111.111.111-11' } as Pessoa);
    this.lista.push({ id: 3, nome: 'Teste C', tipo: "PJ", cpfCnpj: '222.222.222-22' } as Pessoa);
    this.lista.push(
      {
        id: 4,
        nome: 'Teste D',
        tipo: "PJ",
        cpfCnpj: '333.333.333-33',
        enderecoList: [
          {
            id: 1,
            pessoa: { id: 4 },
            endereco: {
              id: 1,
              logradouro: 'Log A',
              complemento: 'Comp A',
              numero: 'Num A',
              bairro: 'Bai A',
              cidade: 'Cid A',
              uf: 'Uf A',
              cep: 'Cep A'
            }
          },
          {
            id: 2,
            pessoa: { id: 4 },
            endereco: {
              id: 2,
              logradouro: 'Log B',
              complemento: 'Comp B',
              numero: 'Num B',
              bairro: 'Bai B',
              cidade: 'Cid B',
              uf: 'Uf B',
              cep: 'Cep B'
            }
          },
          {
            id: 3,
            pessoa: { id: 4 },
            endereco: {
              id: 3,
              logradouro: 'Log C',
              complemento: 'Comp C',
              numero: 'Num C',
              bairro: 'Bai C',
              cidade: 'Cid C',
              uf: 'Uf C',
              cep: 'Cep C'
            }
          }
        ]
      } as Pessoa);
    this.filtro = new PessoaFiltro();
  }

}
