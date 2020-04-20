import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AnexarTipo } from './anexar-tipo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-anexar',
  templateUrl: './anexar.component.html',
  styleUrls: ['./anexar.component.scss']
})
export class AnexarComponent implements OnInit {

  @Input('multiplo')
  multiplo: boolean;

  public AnexarTipo: AnexarTipo;

  public tipoAnexoList: AnexarTipo[];

  public resultado: Subject<any> = new Subject();

  public imagem: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  exibirAnexarTipo(tipo: string) {
    const tipoEnum: AnexarTipo = (<any>AnexarTipo)[tipo];
    return this.tipoAnexoList.lastIndexOf(tipoEnum) >= 0;
  }

  public getImagem(imagem) {
    this.imagem = imagem;
  }

  public confirmar() {
    if (this.imagem) {
      this.resultado.next({'IMAGEM': this.imagem});
    }
    this.modalRef.hide();
  }

}
