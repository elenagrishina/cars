import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICar } from '../models/car';
import { CarsService } from '../services/cars.service';

Injectable();
export class CarResolver {

    constructor(
        private carsService: CarsService,
        private title: Title
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const carId = parseInt(route.params.carId, 10);

        return this.carsService.getCarById(carId)
            .pipe(tap((car: ICar) => this.title.setTitle(car && car.model || 'Car')));
    }
}

