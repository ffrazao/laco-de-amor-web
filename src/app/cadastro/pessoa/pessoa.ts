import { Endereco } from '../endereco/endereco';
import { PessoaEndereco } from './pessoa-endereco';

export class Pessoa {
    id: number;
    tipo: string;
    cpfCnpj: string;
    nome: string;
    email: string;
    contato1: string;
    contato2: string;
    contato3: string;
    enderecoList: PessoaEndereco[];
}
