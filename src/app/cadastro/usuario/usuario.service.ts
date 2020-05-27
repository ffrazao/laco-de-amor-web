import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Usuario } from '../../comum/modelo/entidade/usuario';
import { UsuarioFiltroDTO } from '../../comum/modelo/dto/usuario.filtro.dto';

@Injectable()
export class UsuarioCrudService extends ServicoCrudService<Usuario, UsuarioFiltroDTO> {

  constructor() {
    super('usuario');

    this.filtro = new UsuarioFiltroDTO();
  }

}
