import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	user = { email: '', password: '' };

	constructor() {
		console.log('Welcome!');
	}

	loginSubmit(form: NgForm) {
		console.log('Log in!');
		console.log(this.user);
		console.log(form);
		return false;
	}

}
