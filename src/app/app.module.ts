import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ExampleComponent } from './example/example.component';
import { AboutComponent } from './about/about.component';

import { ROUTING } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
    imports: [ BrowserModule, ROUTING ],
    declarations: [
        AppComponent,
        AboutComponent,
        ExampleComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

