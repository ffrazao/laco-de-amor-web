import { PessoaEndereco } from './pessoa-endereco';

export class Pessoa {
    public id: number;
    public tipo: string;
    public cpfCnpj: string;
    public nome: string;
    public email: string;
    public contato1: string;
    public contato2: string;
    public contato3: string;
    public enderecoList: PessoaEndereco[] = [];
}
