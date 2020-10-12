import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CarResolver } from 'src/app/resolvers/car-resolver';
import { CarEditorComponent } from './car-editor.component';

const routes: Routes = [
    {
        path: ':carId',
        component: CarEditorComponent,
        resolve: { car: CarResolver },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarEditorRoutingModule { }
