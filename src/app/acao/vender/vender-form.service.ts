import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EventoFormService } from '../evento/evento-form.service';

@Injectable()
export class VenderFormService extends EventoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

}
