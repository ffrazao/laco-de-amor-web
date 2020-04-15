import { Pessoa } from './pessoa'
import { Endereco } from '../endereco/endereco';

export class PessoaEndereco {
    public id: number;
    public pessoa: Pessoa;
    public endereco: Endereco;
}