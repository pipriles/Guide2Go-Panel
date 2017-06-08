import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MdSnackBar } from '@angular/material';

import { LoginService } from '../../services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [ LoginService ]
})
export class LoginComponent {

	user: any; 

	constructor(
		private loginServ: LoginService,
		private router: Router,
		private snackBar: MdSnackBar) {

		console.log('Welcome!');
		this.user = { email: '', password: '' };
	}

	loginSubmit() {
		this.loginServ.auth(this.user)
			.catch((err) => this.handleError(err))
			.subscribe((token) => this.handleToken(token));
	}

	/**
	 * Esto puede estar aqui si se mantiene sencillo,
	 * Hay que asegurar que la llave es la misma
	 * que en angular-jwt
	 */
	private handleToken(token: string) {
		localStorage.setItem('token', token);

		this.snackBar.dismiss();
		this.snackBar.open('Bienvenido!', '', {
			duration: 1500
		});
		this.router.navigateByUrl('/welcome');
	}

	private handleError(err: Response) {
		const msg = (err.status != 401) 
			? 'Error de servidor' 
			: 'Usuario o contraseña incorrectos';
		
		this.snackBar.open(msg, '', {
			'duration': 5000
		});

		return Observable.throw(err);
	}

}
