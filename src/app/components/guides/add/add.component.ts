import { Component, ViewChild, Input, ElementRef, 
	Output, EventEmitter, OnInit  } from '@angular/core';

import { GuidesService } from '../../../services';
import { IdiomasService } from '../../../services';
import { ZonesService } from '../../../services'; 

@Component({
  selector: 'app-guides-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ IdiomasService,ZonesService ]
})
export class GuidesAddComponent implements OnInit {

	@Output() request = new EventEmitter(); 
	
	data: any;
	idiomas: any;
	zones: any;

  constructor(private _serv: GuidesService, private _idiomaServ: IdiomasService, private _zoneServ: ZonesService) {
  	
  	this.data = {
			costo: undefined,
			idiomas_id: undefined,
			zonas_id: undefined
  	};
  	this._idiomaServ.get().subscribe(
        (idioma) => {this.idiomas = idioma},
        (error) => console.log(error)
      ); 
  	this._zoneServ.get().subscribe((zones) => {this.zones = zones},
        (error) => console.log(error));
   }

  ngOnInit() {}

  addGuide() {
		let data = this.data;
		if (data.costo == undefined) 	return;
		if (data.idiomas_id == undefined) return;
		if (data.zonas_id == undefined) return;

		let body = {
			cost: data.costo,
			lang: data.idiomas_id,
			zone: data.zonas_id
		};

		/* Create here */
		this._serv.create(body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	changeZone(type){
		console.log(this.data);
		this.data.zonas_id = type;
	}

	changeIdioma(type){
		this.data.idiomas_id = type;
	}

}
