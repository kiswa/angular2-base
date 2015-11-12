/// <reference path="../../node_modules/angular2/angular2.d.ts" />

import {
    Component,
    bootstrap
} from "angular2/angular2";

@Component({
    selector: 'my-app',
    template: '<h1>My Angular2 Base App</h1>'
})
class AppComponent { }

bootstrap(AppComponent);
