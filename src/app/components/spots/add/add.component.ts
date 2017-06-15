import { 
	Component, ViewChild, Input, ElementRef, 
	Output, EventEmitter, OnInit 
} from '@angular/core';

import { MapComponent } from '../../map/map.component';
import { SpotsService } from '../../../services';

@Component({
	selector: 'app-spots-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class SpotsAddComponent implements OnInit {

	@ViewChild('map') 
	map: MapComponent;

	@Output() request = new EventEmitter(); 

	@Input() zones: any[];

	data: any;
	parentPolygon: any[];

	constructor(private _serv: SpotsService) {
		this.zones = [];
		this.data = { 
			name: '', 
			description: '',
			zone: undefined,
			category: undefined,
			point: undefined
		};
	}

	ngOnInit() {}

	addSpot() {

		console.log(this.data);

		let data = this.data;
		if ( data.name === ''
			|| data.description === ''
			|| data.zone  === undefined
			|| data.category  === undefined
			|| data.point === undefined)
			return;

		let body = {
			name: this.data.name,
			subzone: this.data.zone,
			category: this.data.category,
			description: this.data.description,
			point: this.data.point
		};

		/* Create here */
		this._serv.create(body)
			.subscribe(
				(res) => {
					this.request.emit(res);
					console.log(res);
				},
				(err) => console.log(err)
			);
	}

	setMarker(marker) {
		this.data.point = marker;
	}

	changeZone(zone) {
		console.log(zone);
		let result = this.zones.find((elem) => elem.id === zone);
		let polygon = this.fixPolygonForMap(result.poligono);

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
