import { ProdutoModelo } from './produto-modelo';
import { ProdutoAtributo } from './produto-atributo';

export class ProdutoDescricao {

    public id: number;
    public produtoModelo: ProdutoModelo;
    public produtoAtributo: ProdutoAtributo;
    public valor: string;
    public ordem: number;

}