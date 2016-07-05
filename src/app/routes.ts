import { RouterConfig } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { AboutComponent } from './about/about.component';

export const ROUTES: RouterConfig = [
    { path: '', component: ExampleComponent },
    { path: 'about', component: AboutComponent }
];

