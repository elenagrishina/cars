import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ICar } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
    selector: 'app-car-editor',
    templateUrl: './car-editor.component.html',
    styleUrls: ['./car-editor.component.scss']
})
export class CarEditorComponent implements OnInit {

    loading = false;
    car: ICar;
    editForm: FormGroup;

    get modelControl(): AbstractControl {
        return this.editForm.get('model');
    }

    get yearControl(): AbstractControl {
        return this.editForm.get('year');
    }

    get srcControl(): AbstractControl {
        return this.editForm.get('src');
    }

    get descriptionControl(): AbstractControl {
        return this.editForm.get('description');
    }

    constructor(
        private title: Title,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private carsService: CarsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.car = this.activatedRoute.snapshot.data.car;

        this.editForm = this.fb.group({
            model: ['', [Validators.required]],
            year: ['', [Validators.required]],
            src: ['', [Validators.required, Validators.pattern(/http:\/\//)]],
            description: ['', [Validators.required]],
            id: null
        });

        if (this.car) {
            this.editForm.patchValue({
                model: this.car.model,
                year: this.car.year,
                src: this.car.src,
                description: this.car.description,
                id: this.car.id
            });
            this.title.setTitle('Edit car');
        } else {
            this.title.setTitle('Add new car');
        }
    }

    onSubmit(): void {
        const { model, year, src, description, id } = this.editForm.value;
        this.loading = true;
        const newCar: ICar = {
            model,
            year,
            src,
            description,
            id
        };

        const request = this.car ? this.carsService.updateCar(newCar) : this.carsService.saveCar(newCar);

        request.subscribe(({message}: {message: string}) => {
                if (message) {
                    this.router.navigate(['catalog']);
                }
                this.loading = false;
            });
    }

    onCancel(): void {
        this.router.navigate(['catalog']);
    }

    checkError(control: AbstractControl): string {
        return control.hasError('required') && 'Please fill the field' || control.hasError('pattern') && 'Link must include "http://"';
    }
}
