import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { InjetorEstaticoService } from './app/comum/servico/injetor-estatico.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    InjetorEstaticoService.injector = moduleRef.injector;
  })
  .catch(err => {
    alert(err);
    console.error(err);
  });
