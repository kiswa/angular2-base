import {
    Component,
    View,
    bootstrap
} from "angular2/angular2";

@Component({
    selector: 'my-app',
})
@View({
    template: '<h1>My Angular2 Base App</h1>'
})
class AppComponent { }

bootstrap(AppComponent);
