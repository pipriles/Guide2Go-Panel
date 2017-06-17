import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { UsersService } from '../../../services';

@Component({
  selector: 'app-users-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class UsersEditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter(); 
	data: any;

  constructor(private _serv: UsersService) {
  	this.data = {
		dolares: 0,
		email: '',
		name: '',
		referer_id: null,
		user_type: null,
		password: '',
		id: null
  	};
   }

  ngOnInit() {
  }


  @Input()
	set user(opt) {
		if (opt === undefined) return;

		if(opt.user_type == 'admin') opt.user_type = 1;
		else if(opt.user_type == 'blogger') opt.user_type = 2;
		else opt.user_type = 3;
		this.data = {
			dolares: opt.dolares,
			email: opt.email,
			name: opt.name,
			user_type: opt.user_type,
			password: '',
			id: opt.id
		};
	}

	editUser(){
		let data = this.data;
		if (data.name == '') 	return;
		if (data.email == '') return;
		if (!data.user_type) return;
		let body = {
			name: this.data.name,
			password: this.data.password,
			dolares: this.data.dolares,
			user_types_id: this.data.user_type,
			email: this.data.email
		};

		this._serv.update(data.id,body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	stopEdit() {
		this.cancel.emit();
	}

	changeType(type){
		this.data.user_type = type;
	}
}
