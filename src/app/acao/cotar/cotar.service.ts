import { Injectable } from '@angular/core';

import { Cotar } from '../../comum/modelo/entidade/cotar';
import { CotarFiltro } from '../../comum/modelo/filtro/cotar-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';
import { Filtro } from '../../comum/modelo/filtro/filtro';

import json from '../../json/cotar.json';

@Injectable()
export class CotarService extends ServicoCrudService<Cotar, CotarFiltro> {

  constructor() {
    super('acao/cotar');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

  public calcularValoresCotacao(c: Cotar): ResultadoValoresCotacao {
    let menor = 0;
    let media = 0;
    let maior = 0;
    if (c.eventoPessoaList && c.eventoPessoaList.length) {
      let totalGeral = 0;
      for (let i = 0; i < c.eventoPessoaList.length; i++) {
        let total = 0;
        if (c.eventoPessoaList[i].eventoProdutoList && c.eventoPessoaList[i].eventoProdutoList.length) {
          for (let j = 0; j < c.eventoPessoaList[i].eventoProdutoList.length; j++) {
            let p: EventoProduto = c.eventoPessoaList[i].eventoProdutoList[j];
            total += p.quantidade * p.valorUnitario;
          }
        }
        if (i === 0) {
          menor = total;
          maior = total;
        } else {
          menor = menor < total ? menor: total;
          maior = total > maior ? total : maior;
        }
        totalGeral += total;
      }
      media = totalGeral / c.eventoPessoaList.length;
    }
    return {
      menor,
      media,
      maior,
    };
  }

}

export class ResultadoValoresCotacao {
  menor: number = 0;
  media: number = 0;
  maior: number = 0;
}
