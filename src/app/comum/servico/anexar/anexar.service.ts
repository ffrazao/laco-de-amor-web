import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalModule, MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { AnexarTipo as AnexarTipo } from './anexar-tipo';
import { AnexarComponent } from './anexar.component';

@Injectable({
  providedIn: 'root'
})
export class AnexarService {

  private _modalRef: MDBModalRef;

  constructor(
    private _modalService: MDBModalService) {
  }

  public carregar(tipoAnexoList: AnexarTipo[], multiplo: boolean) {
    return new Observable((observer) => {
      this._modalRef = this._modalService.show(AnexarComponent, {
        backdrop: true,
        keyboard: true,
        show: false,
        ignoreBackdropClick: true,
        class: 'modal-lg',
        containerClass: 'right',
        animated: true,
        data: {
          tipoAnexoList,
          multiplo
        },
      });

      this._modalRef.content.resultado.subscribe((result: any) => { 
        observer.next(result);
        observer.complete();
      });
    });
  }

}
