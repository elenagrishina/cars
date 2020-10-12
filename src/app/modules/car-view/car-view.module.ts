import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CarViewComponent } from './car-view.component';
import { CarViewRoutingModule } from './car-view-routing.module';
import { CarResolver } from 'src/app/resolvers/car-resolver';

@NgModule({
    declarations: [CarViewComponent],
    imports: [
        CommonModule,
        CarViewRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        CarResolver
    ]
})
export class CarViewModule { }
