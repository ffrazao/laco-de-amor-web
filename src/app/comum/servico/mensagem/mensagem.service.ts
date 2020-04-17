import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private toastr: ToastrService) { }

  public sucesso(msg: string, titulo: string = null) {
    this.toastr.success(msg, titulo ? titulo : 'Sucesso!');
  }

  public erro(msg: string, titulo: string = null) {
    this.toastr.error(msg, titulo ? titulo : 'Erro!');
  }
  
}
