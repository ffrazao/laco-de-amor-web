import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Cotar } from '../../comum/modelo/entidade/cotar';
import { CotarFiltroDTO } from '../../comum/modelo/dto/cotar.filtro.dto';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';

@Injectable()
export class CotarCrudService extends ServicoCrudService<Cotar, CotarFiltroDTO> {

  constructor() {
    super('cotar');

    this.filtro = new CotarFiltroDTO();
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
  menor = 0;
  media = 0;
  maior = 0;
}
