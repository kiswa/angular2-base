import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
// import { enableProdMode } from '@angular/core';

import { AppComponent } from './app.component';
import { ROUTES } from './routes';

// enableProdMode();

bootstrap(AppComponent, [
    provideRouter(ROUTES)
]);

