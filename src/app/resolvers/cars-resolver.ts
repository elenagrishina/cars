import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CarsService } from '../services/cars.service';

Injectable();
export class CarsResolver {

    constructor(
        private carsService: CarsService,
        private title: Title
    ) { }

    resolve(): Observable<any> {
        this.title.setTitle('Catalog');

        return this.carsService.getCarList();
    }
}
