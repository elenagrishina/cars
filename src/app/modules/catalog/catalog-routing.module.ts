import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { CarsResolver } from '../../resolvers/cars-resolver';

const routes: Routes = [
    {
        path: '',
        component: CatalogComponent,
        resolve: {cars: CarsResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule { }
