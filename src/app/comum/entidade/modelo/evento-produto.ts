import { EntidadeId } from '../entidade-id';
import { Produto } from './produto';
import { UnidadeMedida } from './unidade-medida';
import { Pessoa } from './pessoa';

export class EventoProduto implements EntidadeId {

    public id: number;
    public produto: Produto;
    public quantidade: number;
    public unidadeMedida: UnidadeMedida;
    public valorUnitario: number;
    public valorTotal: number;
    public pessoa: Pessoa;

}