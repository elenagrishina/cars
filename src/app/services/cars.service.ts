import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICar } from '../models/car';

@Injectable({
    providedIn: 'root'
})
export class CarsService {

    carList: ICar[] = [];

    getCarList(): Observable<ICar[]> {
        this.carList = this.getCarsFromLocalStorage();

        return of(this.carList);
    }

    saveCar(car: ICar): Observable<{ message: string }> {
        const lastCarId = this.carList[this.carList.length - 1];
        car.id =  lastCarId ? lastCarId.id + 1 : 1;
        this.carList.push(car);
        this.saveCarsInLocalStorage();

        return of({message: 'Car has been successfully saved'}).pipe(delay(3000));
    }

    updateCar(car: ICar): Observable<{ message: string }> {
        this.carList = this.carList.map((c: ICar) => c.id === car.id ? car : c);
        this.saveCarsInLocalStorage();

        return of({message: 'Car has been successfully updated'}).pipe(delay(3000));
    }

    deleteCar(carId: number): Observable<{ message: string }> {
        this.carList = this.carList.filter((c: ICar) => c.id !== carId);
        this.saveCarsInLocalStorage();

        return of({message: 'Car has been successfully deleted'}).pipe(delay(3000));
    }

    getCarById(carId: number): Observable<ICar> {
        this.carList = this.getCarsFromLocalStorage();
        const car = this.carList.find((c: ICar) => c.id === carId);

        return of(car || null);
    }

    getCarsFromLocalStorage(): ICar[] {
        const savedCars = localStorage.getItem('carList');

        return savedCars ? JSON.parse(savedCars) : [];
    }

    saveCarsInLocalStorage(): void {
        localStorage.setItem('carList', JSON.stringify(this.carList));
    }
}
