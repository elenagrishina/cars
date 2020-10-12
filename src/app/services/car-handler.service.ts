import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class CarHandlerService {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    openSnackBar(message: string, actionText = 'Close', duration = 8000): void {
        this.snackBar.open(message, actionText, {
            duration
        });
    }
}
