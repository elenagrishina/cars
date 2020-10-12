import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isAuthenticated$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.authService.getSavedToken();

        this.isAuthenticated$ = this.authService.isAuthenticated$
            .pipe(tap((auth: boolean) => !auth && this.router.navigate(['login'])));
    }

    onExit(): void {
        this.authService.removeToken();
    }
}
