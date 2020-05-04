import { EventoPessoa } from '../entidade/modelo/evento-pessoa';
import { UnidadeMedida } from '../entidade/modelo/unidade-medida';
import { Cotar } from '../entidade/modelo/cotar';

export function eventoPessoaListComparar(o1: EventoPessoa, o2: EventoPessoa) {
    let result = o1 && o2 && o1.pessoa && o2.pessoa ? o1.pessoa.id === o2.pessoa.id : o1 === o2;
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