import { ProdutoDescricao } from './produto-descricao';
import { ProdutoPreco } from './produto-preco';
import { EntidadeId } from '../../comum/entidade/entidade-id';

export class ProdutoModelo implements EntidadeId {

    public id: number;
    public nome: string;
    public codigo: string;
    public materiaPrima: string;
    public foto: any;
    public produtoDescricaoList: ProdutoDescricao[] = [];
    public produtoPrecoList: ProdutoPreco[] = [];

}
