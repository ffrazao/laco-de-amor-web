import { Pessoa } from '../pessoa/pessoa';
import { EntidadeId } from '../../comum/entidade/entidade-id';

export class Cliente implements EntidadeId {

    public id: number;
    public pessoa: Pessoa;

}