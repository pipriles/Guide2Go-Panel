import { Component, ViewChild, Input, ElementRef, 
	Output, EventEmitter, OnInit  } from '@angular/core';

import { UsersService } from '../../../services';

@Component({
  selector: 'app-users-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class UsersAddComponent implements OnInit {

	@Output() request = new EventEmitter(); 
	
	data: any;

  constructor(private _serv: UsersService) {
  	//posiblemente haya q vambiar el page y user_type, pero en back end, osea crear un controlador
  	this.data = {

		dolares: 0,
		email: '',
		name: '',
		referer_id: null,
		user_type: null,
		password: ''
  	};
  	 
   }

  ngOnInit() {}

  addUser() {
		let data = this.data;
		if (data.name == '') 	return;
		if (data.email == '') return;
		if (data.password == '') return;
		if (!data.user_type) return;
		let body = {
			name: this.data.name,
			referer: this.data.referer_id,
			password: this.data.password,
			dolares: this.data.dolares,
			user_types_id: this.data.user_type,
			email: this.data.email
		};

		/* Create here */
		this._serv.create(body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	changeType(type){
		this.data.user_type = type;
	}

}
