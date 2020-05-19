import { FiltroDTO } from './filtro.dto';

export class PessoaFiltroDTO implements FiltroDTO {

    nome: string;
    tipo: string;
    cpfCnpj: string;

}
