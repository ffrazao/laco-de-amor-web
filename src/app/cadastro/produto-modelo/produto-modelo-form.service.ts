import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { ProdutoModelo } from '../../comum/modelo/entidade/produto-modelo';
import { ProdutoDescricao } from '../../comum/modelo/entidade/produto-descricao';
import { ProdutoAtributo } from '../../comum/modelo/entidade/produto-atributo';
import { ProdutoPreco } from '../../comum/modelo/entidade/produto-preco';
import { ProdutoAtributoService } from '../produto-atributo/produto-atributo.service';
import { ProdutoModeloFiltroDTO } from '../../comum/modelo/dto/produto-modelo.filtro.dto';

@Injectable()
export class ProdutoModeloFormService {

  public $produtoAtributoList: Observable<ProdutoAtributo[]> = this._produtoAtributoService.filtrar();

  constructor(
    private _formBuilder: FormBuilder,
    private _produtoAtributoService: ProdutoAtributoService,
  ) {
  }

  public criarFormulario(entidade: ProdutoModelo) {
    if (!entidade) {
      entidade = new ProdutoModelo();
    }

    const result = this._formBuilder.group(
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
    return this._formBuilder.array(result);
  }

  public criarFormularioProdutoDescricao(entidade: ProdutoDescricao) {
    if (!entidade) {
      entidade = new ProdutoDescricao();
    }
    let result = this._formBuilder.group(
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
    const result = this._formBuilder.control(entidade, [Validators.required]);

    result['$produtoAtributoListFiltered'] = result.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const r = this._filter(value);
        return r;
      })
    );

    return result;
  }

  private _filter(value: string | ProdutoAtributo) {
    let filterValue = '';
    if (value) {
      filterValue = typeof value === 'string' ? value.toLowerCase() : value.nome.toLowerCase();
      this._produtoAtributoService.filtro.nome = filterValue;
      return this.$produtoAtributoList.pipe(
        map(atributos => atributos.filter(atributo => atributo.nome.toLowerCase().includes(filterValue)))
      );
    } else {
      const result = new ProdutoAtributo();
      result.nome = typeof value === 'string' ? value.toLowerCase() : value.nome.toLowerCase();
      return this.$produtoAtributoList;
    }
  }

  public criarFormularioProdutoPrecoList(lista: ProdutoPreco[]) {
    const result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioProdutoPreco(lista[i]));
      }
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioProdutoPreco(entidade: ProdutoPreco) {
    if (!entidade) {
      entidade = new ProdutoPreco();
    }
    let result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        vigencia: [entidade.vigencia, [Validators.required]],
        valor: [entidade.valor, [Validators.required]],
        destinacao: [entidade.destinacao, [Validators.required]],
      }
    );

    return result;
  }

  public criarFormularioFiltro(entidade: ProdutoModeloFiltroDTO) {
    if (!entidade) {
      entidade = new ProdutoModeloFiltroDTO();
    }
    const result = this._formBuilder.group(
      {
        nome: [entidade.nome, []],
        codigo: [entidade.codigo, []],
        materiaPrima: [entidade.materiaPrima, []],
      }
    );
    return result;
  }

}
