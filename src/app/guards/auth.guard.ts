import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean> {

        return this.authService.isAuthenticated().pipe(
            take(1),
            map((authenticated: boolean) => {
                if (!authenticated) {
                    this.router.navigate(['login']);
                    return false;
                }
                return true;
            })
        );
    }
}
