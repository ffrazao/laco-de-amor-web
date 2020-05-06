import { Parceiro } from '../../comum/modelo/entidade/parceiro';
import { Fornecedor } from '../../comum/modelo/entidade/fornecedor';
import { Cliente } from '../../comum/modelo/entidade/cliente';
import { PessoaEndereco } from '../../comum/modelo/entidade/pessoa-endereco';
import { EntidadeId } from '../../comum/modelo/entidade-id';

export class Pessoa implements EntidadeId {

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
