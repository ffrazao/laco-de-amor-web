import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ProdutoModeloService } from '../produto-modelo.service';
import { ProdutoModeloFormService } from '../produto-modelo-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { AnexarService } from '../../../comum/servico/anexar/anexar.service';
import { ProdutoModelo } from '../../../comum/entidade/modelo/produto-modelo';
import { ProdutoDescricao } from '../../../comum/entidade/modelo/produto-descricao';
import { ProdutoPreco } from '../../../comum/entidade/modelo/produto-preco';
import { ProdutoAtributo } from '../../../comum/entidade/modelo/produto-atributo';
import { AnexarTipo } from '../../../comum/servico/anexar/anexar-tipo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this._formService.criarFormulario(new ProdutoModelo());

  public isEnviado = false;
  public entidade: ProdutoModelo;
  public id: number;
  public acao: string;
  public SEM_IMAGEM = environment.SEM_IMAGEM;

  public produtoDescricaoEditando = false;
  public produtoPrecoEditando = false;

  constructor(
    private _service: ProdutoModeloService,
    private _formService: ProdutoModeloFormService,
    private _mensagem: MensagemService,
    private _anexar: AnexarService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.id;
    });

    this.route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this._formService.criarFormulario(this.entidade);
    });
  }

  get produtoDescricaoList(): FormArray {
    return this.frm.get('produtoDescricaoList') as FormArray;
  }

  get produtoPrecoList(): FormArray {
    return this.frm.get('produtoPrecoList') as FormArray;
  }

  public displayFn(produtoAtributo?: ProdutoAtributo): string {
    return produtoAtributo ? produtoAtributo.nome : '';
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    if (this.frm.invalid) {
      let msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    this.entidade = this.frm.value;
    if ('Novo' === this.acao) {
      this._service.create(this.entidade);
      this._service.lista.push(this.entidade);
      this.router.navigate(['cadastro', 'produto-modelo', this.entidade.id]);
    } else {
      this._service.update(this.id, this.entidade);
      this.router.navigate(['cadastro', 'produto-modelo']);
    }
  }

  public ordenadoProdutoDescricao(lista) {
    lista = lista.sort((o1, o2) => {
      let n1 = parseInt(o1 && o1.value && o1.value.ordem ? o1.value.ordem : 0) || 0;
      let n2 = parseInt(o2 && o2.value && o2.value.ordem ? o2.value.ordem : 0) || 0;
      return ((n1 > n2) ? 1 : ((n1 < n2) ? -1 : 0));
    });
    return lista;
  }

  public ordenadoProdutoPreco(lista) {
    lista = lista.sort((o1, o2) => {
      let n1 = (o1 && o1.value && o1.value.vigencia ? o1.value.vigencia : 0) || 0;
      let n2 = (o2 && o2.value && o2.value.vigencia ? o2.value.vigencia : 0) || 0;
      return ((n1 > n2) ? 1 : ((n1 < n2) ? -1 : 0));
    });
    return lista;
  }

  public sobe(idx: number) {
    let regAnterior = this.produtoDescricaoList.at(idx - 1);
    let regAtual = this.produtoDescricaoList.at(idx);

    let ordemAnterior = regAnterior.get('ordem').value;
    let ordemAtual = regAtual.get('ordem').value;

    regAnterior.get('ordem').setValue(ordemAtual);
    regAtual.get('ordem').setValue(ordemAnterior);
  }

  public desce(idx) {
    let regAtual = this.produtoDescricaoList.at(idx);
    let regPosterior = this.produtoDescricaoList.at(idx + 1);

    let ordemAtual = regAtual.get('ordem').value;
    let ordemPosterior = regPosterior.get('ordem').value;

    regAtual.get('ordem').setValue(ordemPosterior);
    regPosterior.get('ordem').setValue(ordemAtual);
  }

  public novoProdutoDescricao(event) {
    event.preventDefault();
    let e = new ProdutoDescricao();
    e.ordem = 1 + (this.produtoDescricaoList.value as []).length;
    let reg = this._formService.criarFormularioProdutoDescricao(e);
    this.produtoDescricaoEditando = true;
    reg['editar'] = true;
    this.produtoDescricaoList.push(reg);
  }

  public salvarProdutoDescricao(reg) {
    delete reg['anterior'];
    reg['editar'] = false;
    this.produtoDescricaoEditando = false;
  }

  public editarProdutoDescricao(reg) {
    reg['anterior'] = reg.value;
    reg['editar'] = true;
    this.produtoDescricaoEditando = true;
  }

  public excluirProdutoDescricao(idx) {
    this.produtoDescricaoList.removeAt(idx);
    this.produtoDescricaoEditando = false;
  }

  public cancelarProdutoDescricao(reg) {
    if (this.produtoDescricaoList.at(reg)['anterior']) {
      let vlr = this.produtoDescricaoList.at(reg)['anterior'];
      this.produtoDescricaoList.at(reg).setValue(vlr);
      this.produtoDescricaoList.at(reg)['editar'] = false;
      delete this.produtoDescricaoList.at(reg)['anterior'];
    } else {
      this.produtoDescricaoList.removeAt(reg);
    }
    this.produtoDescricaoEditando = false;
  }

  public novoProdutoPreco(event) {
    event.preventDefault();
    let e = new ProdutoPreco();
    let reg = this._formService.criarFormularioProdutoPreco(e);
    this.produtoPrecoEditando = true;
    reg['editar'] = true;
    this.produtoPrecoList.push(reg);
  }

  public salvarProdutoPreco(reg) {
    delete reg['anterior'];
    reg['editar'] = false;
    this.produtoPrecoEditando = false;
  }

  public editarProdutoPreco(reg) {
    reg['anterior'] = reg.value;
    reg['editar'] = true;
    this.produtoPrecoEditando = true;
  }

  public excluirProdutoPreco(idx) {
    this.produtoPrecoList.removeAt(idx);
    this.produtoPrecoEditando = false;
  }

  public cancelarProdutoPreco(reg) {
    if (this.produtoPrecoList.at(reg)['anterior']) {
      let vlr = this.produtoPrecoList.at(reg)['anterior'];
      this.produtoPrecoList.at(reg).setValue(vlr);
      this.produtoPrecoList.at(reg)['editar'] = false;
      delete this.produtoPrecoList.at(reg)['anterior'];
    } else {
      this.produtoPrecoList.removeAt(reg);
    }
    this.produtoPrecoEditando = false;
  }

  public carregarFoto(event) {
    event.preventDefault();
    this._anexar.carregar([AnexarTipo.IMAGEM], false).subscribe((v) => {
      let foto = v['IMAGEM'][0];
      this.frm.get('foto').setValue(foto);
    });
  }

  public limparFoto(event) {
    event.preventDefault();
    this.frm.get('foto').setValue(null);
  }

}
