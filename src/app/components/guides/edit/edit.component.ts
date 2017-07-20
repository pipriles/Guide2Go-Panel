import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { GuidesService } from '../../../services';
import { IdiomasService } from '../../../services';
import { ZonesService } from '../../../services'; 

@Component({
  selector: 'app-guides-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ IdiomasService,ZonesService ]
})
export class GuidesEditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter(); 
	data: any;
	idiomas: any;
	zones: any;

  constructor(private _serv: GuidesService, private _idiomaServ: IdiomasService, private _zoneServ: ZonesService) {
  	this.data = {
		id: undefined,
		name: '',
		costo: undefined,
		idioma: '',
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

  ngOnInit() {
  }


  @Input()
	set guide(opt) {
		if (opt === undefined) return;
		
		this.data = {
			id: opt.id,
			costo: opt.costo,
			idiomas_id: opt.idiomas_id,
			zonas_id: opt.zonas_id
		}; 
		console.log(this.data);
	}

	editGuides(){
		let data = this.data;

		let body = { 
			cost: this.data.costo,
			lang: this.data.idiomas_id,
			zone: this.data.zonas_id
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

	changeZone(type){
		console.log(this.data);
		this.data.zonas_id = type;
	}

	changeIdioma(type){
		this.data.idiomas_id = type;
	}
}
