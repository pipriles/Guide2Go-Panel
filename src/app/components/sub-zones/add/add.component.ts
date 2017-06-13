import { 
	Component, ViewChild, Input, ElementRef, 
	Output, EventEmitter, OnInit 
} from '@angular/core';

import { SubZonesMapComponent } from '../map/map.component'; 
import { SubZonesService } from '../../../services';

@Component({
	selector: 'app-sub-zones-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class SubZonesAddComponent implements OnInit {

	@ViewChild('map') 
	map: SubZonesMapComponent;

	@Output() request = new EventEmitter(); 
	
	@Input() zones: any[];
	
	data: any;
	parentPolygon: any[];

	constructor(private _serv: SubZonesService) {
		this.zones = [];
		this.data = { 
			name: '', 
			zone: undefined,
			polygon: []
		};
	}

	ngOnInit() {}

	addSubZone() {

		let data = this.data;
		if (data.name == '') 				 return;
		if (data.zone === undefined) return;
		if (data.polygon.length < 1) return;

		let body = {
			name: this.data.name,
			zone: this.data.zone.id,
			polygon: this.data.polygon
		};

		/* Create here */
		this._serv.create(body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	setPolygon(polygon) {
		this.data.polygon = polygon;
	}

	changeZone(zone) {
		console.log(zone);
		let polygon = this.fixPolygonForMap(zone.poligono);

		this.data.zone = zone;
		this.parentPolygon = polygon;
		this.map.fitPolygonBounds(polygon);
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

}
