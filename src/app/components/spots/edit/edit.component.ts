import { 
	Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit
} from '@angular/core';

import { MapComponent } from '../../map/map.component';
import { SubZonesService } from '../../../services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter();

	@ViewChild('map') 
	map: MapComponent;

	@Input() zones: any[];

	data: any;
	parentPolygon: any[];
	childPolygon: any[];

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
		
		let id = this.data.id;
		let body = {
			name: this.data.name,
			zone: this.data.zone,
			polygon: this.data.polygon
		};
		
		console.log('Request body:', id, body);

		/* Modifica la sub zona */
		this._serv.update(id, body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	setPolygon(polygon) {
		this.data.polygon = polygon;
	}

	@Input()
	set zone(opt) {
		if (opt === undefined) return;
		let parentPolygon = this.fixPolygonForMap(opt.zona.poligono);
		let childPolygon = this.fixPolygonForMap(opt.poligono);

		this.map.fitPolygonBounds(childPolygon);
		this.childPolygon = childPolygon;
		this.parentPolygon = parentPolygon
		this.data = {
			id: opt.id,
			name: opt.nombre, // Por que nombre? :(
			zone: opt.zona.id,
			polygon: this.fixPolygonForReq(opt.poligono)
		};
	}

	get zone() {
		return this.data;
	}

	changeZone(zone: number) {
		let result = this.zones.find((elem) => elem.id === zone);
		let polygon = this.fixPolygonForMap(result.poligono);

		this.data.zone = result.id;
		this.parentPolygon = polygon;
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
