import { Pessoa } from '../pessoa/pessoa';
import { EntidadeId } from '../../comum/entidade/entidade-id';

export class Parceiro implements EntidadeId {

    public id: number;
    public funcao: string;
    public pessoa: Pessoa;

}