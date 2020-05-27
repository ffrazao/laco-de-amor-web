import { FiltroDTO } from './filtro.dto';
import { Confirmacao } from '../dominio/confirmacao';

export class UsuarioFiltroDTO implements FiltroDTO {

    login: string;
    email: string;
    ativo: Confirmacao;
    perfil: string[];

}
