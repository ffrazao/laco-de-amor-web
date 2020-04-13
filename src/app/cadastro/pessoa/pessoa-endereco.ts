import { Pessoa } from './pessoa'
import { Endereco } from '../endereco/endereco';

export interface PessoaEndereco {
    id: number,
    pessoa: Pessoa,
    endereco: Endereco
}