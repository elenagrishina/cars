import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'catalog',
        loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'car-view',
        loadChildren: () => import('./modules/car-view/car-view.module').then(m => m.CarViewModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'car-editor',
        loadChildren: () => import('./modules/car-editor/car-editor.module').then(m => m.CarEditorModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
