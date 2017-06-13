import { 
	Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit
} from '@angular/core';

import {} from '@types/googlemaps';
import { ZonesMapComponent } from '../map/map.component';
import { ZonesService } from '../../../services';

@Component({
	selector: 'app-zones-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class ZonesEditComponent implements OnInit {

	@Output('cancel')  cancel  = new EventEmitter();
	@Output('request') request = new EventEmitter();

	@ViewChild('map') map: ZonesMapComponent;
	_id: number;
	_zone: any;
	mapPolygon: any[];

	constructor(
		private _ref: ElementRef,
		private _serv: ZonesService) {
		this._zone = { name: '', polygon: [] };
	}

	ngOnInit() {}

	zoneSubmit() {

		let body = this._zone;
		if (body.name == '')         return;
		if (body.polygon.length < 1) return;

		console.log('Request body:', body);
		this._serv.update(this._id, body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	setPolygon(polygon) {
		this._zone.polygon = polygon;
	}

	@Input()
	set zone(opt) {
		if (opt === undefined) return;

		let polygon = opt.poligono;
		let mapPolygon = this.fixPolygonForMap(polygon);
		let reqPolygon = this.fixPolygonForReq(polygon);

		this.mapPolygon = mapPolygon;
		this._id = opt.id;
		this._zone = {
			name   : opt.name,
			polygon: reqPolygon
		};
	}

	get zone() {
		return this._zone;
	}

	fixPolygonForMap(polygon) {
		let points = polygon.linestrings[0].points;
		return points.map((p) => {
			return { lat: p.lat, lng: p.lon };
		});
	}

	fixPolygonForReq(polygon) {
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
