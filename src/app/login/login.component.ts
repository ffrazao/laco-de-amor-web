import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from '../comum/entidade/login';
import { LoginService } from './login.service';
import { MensagemService } from '../comum/servico/mensagem/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _service: LoginService,
    private _mensagem: MensagemService,
    private _router: Router) { }

  ngOnInit(): void {
    this.frm = this.criarFormulario(new Login());
  }

  criarFormulario(entidade: Login) {
    if (!entidade) {
      entidade = new Login();
    }
    let result = this._fb.group({
      login: [entidade.login, [Validators.required]],
      senha: [entidade.senha, [Validators.required]],
    });
    return result;
  }

  public login() {
    let reg = this.frm.value as Login;
    this._service.login(reg.login, reg.senha).subscribe((resp) => {
      console.log(resp);
      this._mensagem.sucesso('Login Efetuado!');
      this._router.navigate(['/']);
    }, (err) => {
      let msg = 'Erro no processo de login';
      if (err.error.error_description === 'Bad credentials') {
        msg = 'Credenciais inválidas!';
      }
      console.log(msg, err);
      this._mensagem.erro(msg);
    });
  }

}
