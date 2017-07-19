import { Component, ViewChild, Input, ElementRef, 
	Output, EventEmitter, OnInit  } from '@angular/core';

import { GuidesService } from '../../../services';

@Component({
  selector: 'app-guides-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class GuidesAddComponent implements OnInit {

	@Output() request = new EventEmitter(); 
	
	data: any;

  constructor(private _serv: GuidesService) {
  	
  	this.data = {
			costo: undefined,
			idiomas_id: undefined,
			zonas_id: undefined
  	};
   }

  ngOnInit() {}

  addGuide() {
		let data = this.data;
		if (data.costo == undefined) 	return;
		if (data.idiomas_id == undefined) return;
		if (data.zonas_id == undefined) return;

		let body = {
			costo: data.costo,
			idiomas_id: data.idiomas_id,
			zonas_id: data.zonas_id
		};

		/* Create here */
		this._serv.create(body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

}
