import { 
	Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit
} from '@angular/core';

import { SubZonesMapComponent } from '../map/map.component';
import { SubZonesService } from '../../../services';

@Component({
  selector: 'app-sub-zones-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class SubZonesEditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter();

	@ViewChild('map') 
	map: SubZonesMapComponent;

	@Input() zones: any[];

	data: any;
	mapZone: any[];
	mapSubZone: any[];

	constructor(private _serv: SubZonesService) {
		this.zones = [];
		this.data = { 
			id: undefined,
			name: '', 
			zone: undefined,
			polygon: [] 
		};
	}

	ngOnInit() {}

	editSubZone() {

		let data = this.data;
		if (data.name == '') 				 return;
		if (data.zone === undefined) return;
		if (data.polygon.length < 1) return;
		
		console.log(this.data);

		let id = this.data.id;
		let body = {
			name: this.data.nombre,
			zone: this.data.zone.id,
			polygon: this.data.polygon
		};
		
		console.log('Request body:', body);

		/* Modifica la sub zona */
		this._serv.update(id, body)
			.subscribe(
				(res) => this.request.emit(),
				(err) => console.log(err)
			);
	}

	setPolygon(polygon) {
		this.data.polygon = polygon;
	}

	@Input()
	set zone(opt) {
		if (opt === undefined) return;
		let  zonePolygon = this.fixPolygonForMap(opt.zona.poligono);
		let sZonePolygon = this.fixPolygonForMap(opt.poligono);

		this.map.fitPolygonBounds(sZonePolygon);
		this.mapSubZone = sZonePolygon;
		this.mapZone = zonePolygon
		this.data = {
			id: opt.id,
			name: opt.nombre, // Por que nombre? :(
			polygon: this.fixPolygonForReq(opt.poligono)
		};
	}

	get zone() {
		return this.data;
	}

	// Se puede mover esto a un servicio

	private fixPolygonForMap(polygon) {
		let points = polygon.linestrings[0].points;
		return points.map((p) => {
			return { lat: p.lat, lng: p.lon };
		});
	}

	private fixPolygonForReq(polygon) {
		// Asume que si es un array el poligono
		// esta bien
		if (polygon instanceof Array)
			return polygon;

		// De lo contrario sera un Objeto
		return polygon.linestrings[0].points.map((p) => {
			return [p.lat, p.lon];
		});
	}

	stopEdit() {
		this.cancel.emit();
	}

}
