import { FiltroDTO } from './filtro.dto';
import { PessoaTipo } from '../dominio/pessoa-tipo';

export class PessoaFiltroDTO implements FiltroDTO {

    nome: string;
    pessoaTipo: PessoaTipo;
    cpfCnpj: string;

}
