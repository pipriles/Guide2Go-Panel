import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { GuidesService } from '../../../services';

@Component({
  selector: 'app-guides-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class GuidesEditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter(); 
	data: any;

  constructor(private _serv: GuidesService) {
  	this.data = {
		id: undefined,
		name: '',
		costo: undefined,
		idioma: '',
		idiomas_id: undefined,
		zonas_id: undefined
  	};
   }

  ngOnInit() {
  }


  @Input()
	set guide(opt) {
		if (opt === undefined) return;

		this.data = {
			id: opt.id,
			name: opt.name,
			costo: opt.costo,
			idioma: opt.idioma,
			idiomas_id: opt.idiomas_id,
			zonas_id: opt.zonas_id
		}; 
	}

	editGuides(){
		let data = this.data;

		let body = { 
			costo: this.data.costo,
			idiomas_id: this.data.idiomas_id,
			zonas_id: this.data.zonas_id
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
}
