import { ProdutoModelo } from './produto-modelo';
import { ProdutoAtributo } from './produto-atributo';
import { EntidadeId } from '../../comum/entidade/entidade-id';

export class ProdutoDescricao implements EntidadeId {

    public id: number;
    public produtoModelo: ProdutoModelo;
    public produtoAtributo: ProdutoAtributo;
    public valor: string;
    public ordem: number;

}