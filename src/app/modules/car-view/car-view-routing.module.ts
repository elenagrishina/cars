import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CarResolver } from 'src/app/resolvers/car-resolver';
import { CarViewComponent } from './car-view.component';

const routes: Routes = [
    {
        path: ':carId',
        component: CarViewComponent,
        resolve: { car: CarResolver },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarViewRoutingModule { }
