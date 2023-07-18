import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	constructor(private snackbar: MatSnackBar) {}

	openSnackbar(message: string, action: string) {
		if (action === 'error') {
			this.snackbar.open(message, '', {
				horizontalPosition: 'center',
				verticalPosition: 'top',
				duration: 500,
				panelClass: ['black-snakcbar'],
			});
		} else {
			this.snackbar.open(message, '', {
				horizontalPosition: 'center',
				verticalPosition: 'top',
				duration: 500,
				panelClass: ['green-snakcbar'],
			});
		}
	}
}
