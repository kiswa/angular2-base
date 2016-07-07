import { RouterConfig, provideRouter } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { AboutComponent } from './about/about.component';

const ROUTES: RouterConfig = [
    {
        path: '',
        component: ExampleComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(ROUTES)
];

