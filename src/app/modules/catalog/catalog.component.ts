import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionType } from 'src/app/models/action-type';
import { ICar } from 'src/app/models/car';
import { CarHandlerService } from 'src/app/services/car-handler.service';
import { CarsService } from 'src/app/services/cars.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    cars: ICar[];
    loading = false;

    constructor(
        private carsService: CarsService,
        private carHandlerService: CarHandlerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cars = this.activatedRoute.snapshot.data.cars;
    }

    onAction({ carId, action }: { carId: number, action: ActionType }): void {
        switch (action) {
            case 'view':
                this.router.navigate(['car-view', carId]);
                break;
            case 'delete':
                this.loading = true;

                this.carsService.deleteCar(carId)
                    .subscribe(({ message }: { message: string }) => {
                        if (message) {
                            this.cars = this.cars.filter((c: ICar) => c.id !== carId);
                            this.carHandlerService.openSnackBar(message);
                        }
                        this.loading = false;
                    });
                break;
            case 'update':
                this.router.navigate(['car-editor', carId]);
                break;
            case 'create':
                this.router.navigate(['car-editor', null]);
                break;
        }
    }

    trackByFn(index: number) {
        return index;
    }

}
