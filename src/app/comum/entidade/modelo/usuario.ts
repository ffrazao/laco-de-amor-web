import { EntidadeId } from '../entidade-id';
import { Pessoa } from './pessoa';
import { Confirmacao } from '../../dominio/confirmacao';

export class Usuario implements EntidadeId {

    public id: number;
    public pessoa: Pessoa;
    public login: string;
    public senha: string;
    public ativo: Confirmacao;

}