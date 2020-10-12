import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarsResolver } from '../../resolvers/cars-resolver';

@NgModule({
    declarations: [CatalogComponent, CarCardComponent],
    imports: [
        CommonModule,
        CatalogRoutingModule,
        MatFormFieldModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    providers: [
        CarsResolver
    ]
})
export class CatalogModule { }
