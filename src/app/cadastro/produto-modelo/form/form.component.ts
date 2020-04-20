import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MensagemService } from 'src/app/comum/servico/mensagem/mensagem.service';
import { ProdutoModelo } from '../produto-modelo';
import { ProdutoModeloService } from '../produto-modelo.service';
import { ProdutoDescricao } from '../produto-descricao';
import { ProdutoAtributo } from '../produto-atributo';
import { environment } from 'src/environments/environment';
import { AnexarService } from 'src/app/comum/servico/anexar/anexar.service';
import { AnexarTipo } from 'src/app/comum/servico/anexar/anexar-tipo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this.criarFormulario(new ProdutoModelo());

  public isEnviado = false;
  public entidade: ProdutoModelo;
  public id: number;
  public acao: string;
  public fotoLocal: any = environment.SEM_IMAGEM;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: ProdutoModeloService,
    private router: Router,
    private _mensagem: MensagemService,
    private _anexar: AnexarService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.id;
    });

    this.route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this.criarFormulario(this.entidade);
      this.atualizarFoto();
    });
  }

  get produtoDescricaoList(): FormArray {
    return this.frm.get('produtoDescricaoList') as FormArray;
  }

  criarFormulario(entidade: ProdutoModelo) {
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
      }
    );
    console.log(result);

    return result;
  }

  criarFormularioProdutoDescricaoList(lista: ProdutoDescricao[]) {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioProdutoDescricao(lista[i]));
      }
    }
    return this.formBuilder.array(result);
  }

  criarFormularioProdutoDescricao(entidade: ProdutoDescricao) {
    if (!entidade) {
      entidade = new ProdutoDescricao();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        produtoAtributo: [this.criarFormularioProdutoAtributo(entidade.produtoAtributo), [Validators.required]],
        valor: [entidade.valor, [Validators.required]],
        ordem: [entidade.ordem, [Validators.required]],
      }
    );

    return result;
  }

  criarFormularioProdutoAtributo(entidade: ProdutoAtributo) {
    if (!entidade) {
      entidade = new ProdutoAtributo();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        nome: [entidade.nome, [Validators.required]],
      }
    );
    return result;
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    if (this.frm.invalid) {
      console.log(this.frm);
      let msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    this.entidade = this.frm.value;
    if ('Novo' === this.acao) {
      this.servico.create(this.entidade);
      this.router.navigate(['cadastro', 'produto-modelo', this.entidade.id]);
    } else {
      this.servico.update(this.id, this.entidade);
      this.router.navigate(['cadastro', 'produto-modelo']);
    }
  }

  public novoProdutoDescricao() {
    let reg = this.criarFormularioProdutoDescricao(new ProdutoDescricao());
    reg['editar'] = true;
    this.produtoDescricaoList.push(reg);
  }

  public excluirProdutoDescricao(reg) {
    this.produtoDescricaoList.removeAt(reg);
  }

  public carregarFoto(event) {
    event.preventDefault();
    this._anexar.carregar([AnexarTipo.IMAGEM], false).subscribe((v) => {
      let foto = v['IMAGEM'][0];
      this.frm.get('foto').setValue(foto);
      this.atualizarFoto();
    });
  }

  public limparFoto(event) {
    event.preventDefault();
    this.frm.get('foto').setValue(null);
    this.atualizarFoto();
  }

  public atualizarFoto() {
    this.fotoLocal = environment.SEM_IMAGEM;
    if (this.frm && this.frm.get('foto') && this.frm.get('foto').value) {
      this.fotoLocal = this.frm.get('foto').value;
    }
  }

}
