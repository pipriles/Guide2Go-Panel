import { 
	Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit
} from '@angular/core';

import { MapComponent } from '../../map/map.component';
import { SpotsService } from '../../../services';
import { AudiosService } from '../../../services';

@Component({
	selector: 'app-spots-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss'],
	providers: [AudiosService]
})
export class SpotsEditComponent implements OnInit {

	@Output() cancel  = new EventEmitter();
	@Output() request = new EventEmitter();

	@ViewChild('map') 
	map: MapComponent;

	@ViewChild('audio')
	audio: ElementRef;

	@Input() zones: any[];

	data: any;
	parentPolygon: any[];
	childMarker: any;

	constructor(
		private _serv: SpotsService, 
		private _audServ: AudiosService) {  

		this.zones = [];
		this.data = { 
			id: undefined,
			name: '',
			description: '',
			zone: undefined,
			category: undefined,
			point: undefined,
			audio: undefined
		};
	}

	ngOnInit() {}

	editSpot() {

		let data = this.data;
		if ( data.name === ''
			|| data.description === ''
			|| data.zone  === undefined
			|| data.category  === undefined
			|| data.point === undefined)
			return;

		let id = this.data.id;
		let body = {
			name: this.data.name,
			subzone: this.data.zone,
			category: this.data.category,
			description: this.data.description,
			point: this.data.point
		};

		console.log('Request body:', id, body);

		this._audServ.create(this.data.audio)
			.subscribe(
				(res) => console.log(res),
				(err) => console.log(err)
			);

		/* Modifica la spot */
		this._serv.update(id, body)
			.subscribe(
				(res) => this.request.emit(res),
				(err) => console.log(err)
			);
	}

	setMarker(point) {
		this.data.point = point;
	}

	@Input()
	set spot(opt) {
		if (opt === undefined) return;

		let parentPolygon = this.fixPolygonForMap(opt.sub_zona.poligono);
		let childMarker = this.fixMarkerForMap(opt.punto);

		this.map.fitPolygonBounds(parentPolygon);
		this.childMarker = childMarker;
		this.parentPolygon = parentPolygon;
		this.data = {
			id: opt.id,
			name: opt.nombre,
			zone: opt.sub_zonas_id,
			category: opt.categoria_id,
			description: opt.descripcion,
			point: this.fixMarkerForReq(opt.punto)
		};

		// Hay que hacer una forma para hacer preview
		this.audio.nativeElement.value = "";
	}

	get spot() {
		return this.data;
	}

	changeZone(zone: number) {
		let result = this.zones.find((elem) => elem.id === zone);
		let polygon = this.fixPolygonForMap(result.poligono);
		this.map.fitPolygonBounds(polygon);

		this.data.zone = result.id;
		this.parentPolygon = polygon;
	}

	fileSelected(audio) {

		console.log('Selected file', audio);

		let fd = new FormData();
		let audioDat = {
			lang: 1,
			spot: this.data.id
		}

		fd.append('aud', audio);
		fd.append("lang", '1');
		fd.append("spot", this.data.id);

		console.log(fd);
		this.data.audio = fd;
	}

	// Se puede mover esto a un servicio
	private fixMarkerForMap(marker) {
		return { lat: marker.lat, lng: marker.lon };
	}

	private fixMarkerForReq(marker) {
		return [ marker.lat, marker.lon ];
	}

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
