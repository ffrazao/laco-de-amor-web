import { ProdutoDescricao } from './produto-descricao';

export class ProdutoModelo {

    public id: number;
    public nome: string;
    public codigo: string;
    public materiaPrima: string;
    public foto: any;
    public produtoDescricaoList: ProdutoDescricao[] = [];

}
