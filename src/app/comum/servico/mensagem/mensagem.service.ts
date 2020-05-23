import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmeComponent } from './confirme.component';

@Injectable()
export class MensagemService {

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {
  }

  public sucesso(msg: string, titulo: string = null) {
    this.toastr.success(msg, titulo ? titulo : 'Sucesso!');
  }

  public erro(msg: string, titulo: string = null) {
    this.toastr.error(msg, titulo ? titulo : 'Erro!');
  }

  public confirme(mensagem: string): Promise<boolean> {
    return new Promise(async resolve => {
      const dialogRef = await this.dialog.open(ConfirmeComponent, {
        width: '450px',
        data: { mensagem }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (typeof result === 'string' || result === undefined) {
          result = false;
        }
        resolve(result);
      });
    });
  }
}
