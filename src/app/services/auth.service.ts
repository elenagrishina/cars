import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticated$ = new BehaviorSubject<boolean>(false);

    getToken({email, password}: {email: string, password: string}): Observable<string | Observable<never>> {
        const isValid = email === 'admin@admin' && password === 'admin';

        return isValid ? of('token').pipe(delay(3000)) : throwError({error: 'Wrong email or password, please try again'});
    }

    getSavedToken() {
        const token = !!localStorage.getItem('token');
        this.isAuthenticated$.next(token);
    }

    saveToken(token: string): void {
        localStorage.setItem(token, 'token');
        this.isAuthenticated$.next(!!token);
    }

    removeToken(): void {
        localStorage.removeItem('token');
        this.isAuthenticated$.next(false);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticated$.asObservable();
    }
}
