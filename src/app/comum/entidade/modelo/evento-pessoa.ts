import { EntidadeId } from '../entidade-id';
import { Pessoa } from './pessoa';
import { EventoPessoaFuncao } from './evento-pessoa-funcao';

export class EventoPessoa implements EntidadeId {

    public id: number;
    public pessoa: Pessoa;
    public eventoPessoaFuncao: EventoPessoaFuncao;

}