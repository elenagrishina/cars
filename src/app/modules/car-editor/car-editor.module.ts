import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CarEditorComponent } from './car-editor.component';
import { CarEditorRoutingModule } from './car-editor-routing.module';
import { CarResolver } from 'src/app/resolvers/car-resolver';

@NgModule({
    declarations: [CarEditorComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CarEditorRoutingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
    ],
    providers: [
        CarResolver
    ]
})
export class CarEditorModule { }
