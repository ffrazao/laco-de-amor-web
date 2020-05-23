import { FiltroDTO } from './filtro.dto';
import { Confirmacao } from '../dominio/confirmacao';

export class ProdutoModeloFiltroDTO implements FiltroDTO {

    nome: string;
    codigo: string;
    materiaPrima: Confirmacao;

}
