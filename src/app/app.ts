import { Component } from 'angular2/core';

@Component({
    selector: 'app-component',
    template: `
    <h1>My Angular2 Base App</h1>
`
})
export class AppComponent {
    // Angular 2 uses a tree of components to create an app.
    // This component is the root node of that tree.
}
