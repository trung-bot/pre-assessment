import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule)
},
{
    path: '**',
    redirectTo: 'form',
}];
