import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { UsersService } from '../../../services';
import { GuidesService } from '../../../services';

@Component({
  selector: 'app-users-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ GuidesService ]
})
export class UsersEditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter(); 
	data: any;
	guides: any;

  constructor(private _serv: UsersService, private _guideServ: GuidesService) {
  	this.data = {
		dolares: 0,
		email: '',
		name: '',
		referer_id: null,
		user_type: null,
		password: '',
		id: null,
		guide: null
  	};
  	this._guideServ.get().subscribe(
        (guide) => {this.guides = guide.guides},
        (error) => console.log(error)
      );
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
		if(this.data.guide != null){	
			let guideCreate = {
				guia_id: this.data.guide,
				user_id: this.data.id
			}
			this._serv.createGuide(guideCreate).subscribe(
				(res) => {
					console.log(res);
				},
				(err) => {
					console.log(err);
				}
			);
		}
		
	}

	stopEdit() {
		this.cancel.emit();
	}

	changeType(type){
		this.data.user_type = type;
	}

	changeGuide(type){
		console.log(this.guides);
		this.data.guide = type;
	}
}
