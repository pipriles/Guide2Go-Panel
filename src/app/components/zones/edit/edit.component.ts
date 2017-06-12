import { 
	Component, ViewChild, ElementRef, OnInit, Output, EventEmitter
} from '@angular/core';

import { AgmMap, MapsAPILoader } from '@agm/core';
import { ZonesService } from '../../../services';

import {} from '@types/googlemaps';

@Component({
	selector: 'app-zones-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class ZonesEditComponent implements OnInit {

	@Output() zoneUploaded = new EventEmitter();

	@ViewChild('map') mapRef: ElementRef;
	map: any;
	drawManager: any;
	apiReady: Promise<void>;
	lastDraw: google.maps.Polygon;
	zone: any;

	// Search parameters
	lat: number;
	lng: number;

	constructor(
		private zoneServ: ZonesService,
		private _loader: MapsAPILoader) {
		this.apiReady = this._loader.load();
		this.zone = { name: '', polygon: [] };
	}

	ngOnInit() {
		this.apiReady.then(() => {
			this._createMap();
			this._setDrawingManager();
			this._addEventsListener();
		});
	}

	zoneSubmit() {

		let body = this.zone;
		if (body.name == '') 				 return;
		if (body.polygon.length < 1) return;

		this.zoneServ.create(body)
			.subscribe(
				(res) => this.zoneUploaded.emit(res),
				(err) => console.log(err)
			);
	}

	private _createMap() {
		this.map = new google.maps.Map(this.mapRef.nativeElement, {
			center: {
				lat: 15.397,
				lng: 10.644
			},
			zoom: 2,
			streetViewControl: false
		});
	}

	private _setDrawingManager() {
		this.drawManager = new google.maps.drawing.DrawingManager({
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: [
					google.maps.drawing.OverlayType.POLYGON
				]
			}
		});
		this.drawManager.setMap(this.map);
	}

	private _addEventsListener() {
		google.maps.event.addListener(
			this.drawManager, 
			'polygoncomplete', 
			(polygon: google.maps.Polygon) => {

				if (this.lastDraw) this.lastDraw.setMap(null);
				this.lastDraw = polygon;

				let result = [];
				let points = polygon.getPath().getArray()
				if (points.length <= 0) return;

				for(let i=0; i < points.length + 1; i++) {
					let p = points[i % points.length];
					result.push([p.lat(), p.lng()]);
				}

				this.zone.polygon = result;
			}
		);
	}

}
