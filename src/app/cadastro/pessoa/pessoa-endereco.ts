import { Pessoa } from './pessoa'
import { Endereco } from '../endereco/endereco';
import { EntidadeId } from '../../comum/entidade/entidade-id';

export class PessoaEndereco implements EntidadeId {

    public id: number;
    public pessoa: Pessoa;
    public endereco: Endereco;

}