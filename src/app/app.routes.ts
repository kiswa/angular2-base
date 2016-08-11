import { Routes, RouterModule } from '@angular/router';

import { ExampleComponent } from './example/example.component';
import { AboutComponent } from './about/about.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ExampleComponent
    },
    {
        path: 'about',
        component: AboutComponent
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES);

