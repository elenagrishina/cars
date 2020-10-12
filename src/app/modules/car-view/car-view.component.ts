import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
    selector: 'app-car-view',
    templateUrl: './car-view.component.html',
    styleUrls: ['./car-view.component.scss']
})
export class CarViewComponent implements OnInit {

    car: ICar;
    loading = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private carsService: CarsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.car = this.activatedRoute.snapshot.data.car;
    }

    onDeleteCar(): void {
        this.loading = true;
        this.carsService.deleteCar(this.car.id)
            .subscribe(({message}: {message: string}) => {
                if (message) {
                    this.loading = false;
                    this.router.navigate(['catalog']);
                }
            });
    }

    onEditCar(): void {
        this.router.navigate(['car-editor', this.car.id]);
    }
}
