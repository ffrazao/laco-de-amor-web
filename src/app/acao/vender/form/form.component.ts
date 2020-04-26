import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { Vender } from '../../../comum/entidade/modelo/vender';
import { VenderService } from '../vender.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this.criarFormulario(new Vender());

  public isEnviado = false;
  public entidade: Vender;
  public id: number;
  public acao: string;
  public isParceiro: boolean = false;
  public isFornecedor: boolean = false;
  public isCliente: boolean = false;

  public enderecoEditando = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: VenderService,
    private router: Router,
    private _mensagem: MensagemService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.id;
    });

    this.route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this.criarFormulario(this.entidade);
    });
  }

  criarFormulario(entidade: Vender) {
    if (!entidade) {
      entidade = new Vender();
    }

    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
      }
    );

    return result;
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
      this.servico.create(this.entidade);
      this.router.navigate(['acao', 'vender', this.entidade.id]);
    } else {
      this.servico.update(this.id, this.entidade);
      this.router.navigate(['acao', 'vender']);
    }
  }

}
