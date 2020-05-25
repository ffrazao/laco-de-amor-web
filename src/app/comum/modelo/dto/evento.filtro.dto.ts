import { FiltroDTO } from './filtro.dto';

export class EventoFiltroDTO implements FiltroDTO {

    dataInicio: string;
    dataTermino: string;
    produto: string;
    participante: string;

}
