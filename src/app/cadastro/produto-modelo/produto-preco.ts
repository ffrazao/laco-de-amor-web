import { ProdutoModelo } from './produto-modelo';
import { EntidadeId } from '../../comum/entidade/entidade-id';

export class ProdutoPreco implements EntidadeId {

    public id: number;
    public produtoModelo: ProdutoModelo;
    public vigencia: string;
    public valor: string;
    public destinacao: string;

}