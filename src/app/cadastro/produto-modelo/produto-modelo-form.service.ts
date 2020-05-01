import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';

import { ProdutoModelo } from '../../comum/entidade/modelo/produto-modelo';
import { ProdutoDescricao } from '../../comum/entidade/modelo/produto-descricao';
import { ProdutoAtributo } from '../../comum/entidade/modelo/produto-atributo';
import { ProdutoPreco } from '../../comum/entidade/modelo/produto-preco';
import { Observable, of } from 'rxjs';
import { ProdutoAtributoService } from '../produto-atributo/produto-atributo.service';

@Injectable()
export class ProdutoModeloFormService {

  public $produtoAtributoList: Observable<ProdutoAtributo[]> = of(
    this._produtoAtributoService.lista
  );

  constructor(
    private formBuilder: FormBuilder,
    private _produtoAtributoService: ProdutoAtributoService,
  ) {
  }

  public criarFormulario(entidade: ProdutoModelo) {
    if (!entidade) {
      entidade = new ProdutoModelo();
    }

    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        nome: [entidade.nome, [Validators.required]],
        codigo: [entidade.codigo, []],
        materiaPrima: [entidade.materiaPrima, [Validators.required]],
        foto: [entidade.foto, []],
        produtoDescricaoList: this.criarFormularioProdutoDescricaoList(entidade.produtoDescricaoList),
        produtoPrecoList: this.criarFormularioProdutoPrecoList(entidade.produtoPrecoList),
      }
    );

    return result;
  }

  public criarFormularioProdutoDescricaoList(lista: ProdutoDescricao[]) {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioProdutoDescricao(lista[i]));
      }
    }
    return this.formBuilder.array(result);
  }

  public criarFormularioProdutoDescricao(entidade: ProdutoDescricao) {
    if (!entidade) {
      entidade = new ProdutoDescricao();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        produtoAtributo: this.criarFormularioProdutoAtributo(entidade.produtoAtributo),
        valor: [entidade.valor, [Validators.required]],
        ordem: [entidade.ordem, [Validators.required]],
      }
    );

    return result;
  }

  public criarFormularioProdutoAtributo(entidade: ProdutoAtributo) {
    if (!entidade) {
      entidade = new ProdutoAtributo();
    }
    let result = this.formBuilder.control(entidade, [Validators.required]);

    result['$produtoAtributoListFiltered'] = result.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        let r = this._filter(value);
        return r;
      })
    );

    return result;
  }

  private _filter(value: string | ProdutoAtributo) {
    let filterValue = '';
    if (value) {
      filterValue = typeof value === 'string' ? value.toLowerCase() : value.nome.toLowerCase();
      return this.$produtoAtributoList.pipe(
        map(atributos => atributos.filter(atributo => atributo.nome.toLowerCase().includes(filterValue)))
      );
    } else {
      let result = new ProdutoAtributo();
      result.nome = typeof value === 'string' ? value.toLowerCase() : value.nome.toLowerCase();
      return this.$produtoAtributoList;
    }
  }

  public criarFormularioProdutoPrecoList(lista: ProdutoPreco[]) {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioProdutoPreco(lista[i]));
      }
    }
    return this.formBuilder.array(result);
  }

  public criarFormularioProdutoPreco(entidade: ProdutoPreco) {
    if (!entidade) {
      entidade = new ProdutoPreco();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        vigencia: [entidade.vigencia, [Validators.required]],
        valor: [entidade.valor, [Validators.required]],
        destinacao: [entidade.destinacao, [Validators.required]],
      }
    );

    return result;
  }

}
