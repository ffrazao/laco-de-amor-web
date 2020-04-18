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

  public carregar(tipoAnexoList: AnexarTipo[]) {
    return new Observable((observer) => {

      this._modalService.close.observers.length = 0;
      this._modalService.close.subscribe(() => {
        console.log('close');
        observer.next('Fechando');
        observer.complete();
      });

      this._modalRef = this._modalService.show(AnexarComponent, {
        backdrop: true,
        keyboard: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-side modal-top-right',
        containerClass: 'right',
        animated: true,
        data: {
          tipoAnexoList,
        }
      });
    });
  }

}
