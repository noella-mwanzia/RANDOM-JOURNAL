import { Route } from '@angular/router';

export const appRoutes: Route[] = [
{
    path: '',
    loadChildren: () => import('libs/features/src/lib/features.module').then(m => m.FeaturesModule),

}

];
