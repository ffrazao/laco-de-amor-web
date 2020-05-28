import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Usuario } from '../../comum/modelo/entidade/usuario';
import { UsuarioFiltroDTO } from '../../comum/modelo/dto/usuario.filtro.dto';

@Injectable()
export class UsuarioFormService {

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }

  public criarFormulario(entidade: Usuario) {
    if (!entidade) {
      entidade = new Usuario();
    }

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        login: [entidade.login, [Validators.required]],
        foto: [entidade.foto, []],
        email: [entidade.email, [Validators.required, Validators.email]],
        perfil: [entidade.perfil, []],
        pessoa: [entidade.pessoa, []],
        ativo: [entidade.ativo, [Validators.required]],
      }
    );

    return result;
  }

  public criarFormularioFiltro(entidade: UsuarioFiltroDTO) {
    if (!entidade) {
      entidade = new UsuarioFiltroDTO();
    }
    const result = this._formBuilder.group(
      {
        login: [entidade.login, []],
        email: [entidade.email, []],
        ativo: [entidade.ativo, []],
        perfil: [entidade.perfil, []],
      }
    );
    return result;
  }

}
