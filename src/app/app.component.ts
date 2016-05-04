import { Component } from '@angular/core';
import { ExampleComponent } from './example/example.component';

@Component({
    selector: 'app-component',
    template: `
    <div class="container">
        <h1>My Angular 2 Base App</h1>
        <example></example>
    </div>
    ` ,// Using backticks allows multi-line templates
    directives: [ ExampleComponent ]
})
export class AppComponent {
    public isTestable: boolean = true;

    // Angular 2 uses a tree of components to create an app.
    // This component is the root node of that tree.
}

