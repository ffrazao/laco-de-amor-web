import { Endereco } from './../modelo/entidade/endereco';
import { Pessoa } from './../modelo/entidade/pessoa';
import { EventoPessoa } from '../modelo/entidade/evento-pessoa';
import { UnidadeMedida } from '../modelo/entidade/unidade-medida';
import { Cotar } from '../modelo/entidade/cotar';
import { EventoProduto } from '../modelo/entidade/evento-produto';

export function eventoPessoaListComparar(o1: EventoPessoa, o2: EventoPessoa) {
    let result = o1 && o2 && o1.pessoa && o2.pessoa ? o1.pessoa.id === o2.pessoa.id : o1 === o2;
    return result;
}

export function eventoProdutoListComparar(o1: EventoProduto, o2: EventoProduto) {
    let result = o1 && o2 && o1.produto && o2.produto ? o1.produto.id === o2.produto.id : o1 === o2;
    return result;
}

export function unidadeMedidaListComparar(o1: UnidadeMedida, o2: UnidadeMedida) {
    let result = o1 && o2 ? o1.id === o2.id : o1 === o2;
    return result;
}

export function cotacaoListComparar(o1: Cotar, o2: Cotar) {
    let result = o1 && o2 ? o1.id === o2.id : o1 === o2;
    return result;
}

export function pessoaListComparar(o1: Pessoa, o2: Pessoa) {
    let result = o1 && o2 ? o1.id === o2.id : o1 === o2;
    return result;
}

export function enderecoListComparar(o1: Endereco, o2: Endereco) {
    let result = o1 && o2 ? o1.id === o2.id : o1 === o2;
    return result;
}
