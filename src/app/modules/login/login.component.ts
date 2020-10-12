import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CarHandlerService } from 'src/app/services/car-handler.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;

    get emailControl(): AbstractControl {
        return this.loginForm.get('email');
    }

    get passwordControl(): AbstractControl {
        return this.loginForm.get('password');
    }

    constructor(
        private title: Title,
        private fb: FormBuilder,
        private authService: AuthService,
        private carHandlerService: CarHandlerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Login');
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    checkError(control: AbstractControl): string {
        return control.hasError('required') && 'Please enter a email' || control.hasError('email') && 'Incorrect email format';
    }

    onSubmit(): void {
        const { email, password } = this.loginForm.value;
        this.loading = true;

        this.authService.getToken({ email, password })
            .pipe(
                catchError(({ error }: { error: string }) => {
                    this.carHandlerService.openSnackBar(error);
                    this.loading = false;

                    return throwError(error);
                })
            )
            .subscribe((response: string) => {
                if (response) {
                    this.authService.saveToken(response);
                    this.router.navigate(['catalog']);
                }
                this.loading = false;
            });
    }
}
