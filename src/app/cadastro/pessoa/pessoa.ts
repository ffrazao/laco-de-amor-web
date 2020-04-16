import { Parceiro } from '../parceiro/parceiro';
import { Fornecedor } from '../fornecedor/fornecedor';
import { Cliente } from '../cliente/cliente';
import { PessoaEndereco } from './pessoa-endereco';

export class Pessoa {

    public id: number;
    public nome: string;
    public parceiro: Parceiro;
    public fornecedor: Fornecedor;
    public cliente: Cliente;
    public tipo: string;
    public cpfCnpj: string;
    public email: string;
    public contato1: string;
    public contato2: string;
    public contato3: string;
    public enderecoList: PessoaEndereco[] = [];

}
