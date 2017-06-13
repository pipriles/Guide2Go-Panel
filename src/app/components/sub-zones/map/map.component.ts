import { 
	Component, Input, Output, EventEmitter,
	ViewChild, ElementRef, OnInit
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
	selector: 'app-sub-zones-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class SubZonesMapComponent implements OnInit {

	@Output('polygonComplete') 
	doneDrawing = new EventEmitter();

	@ViewChild('map') 
	mapRef: ElementRef;

	map: google.maps.Map;
	drawManager: google.maps.drawing.DrawingManager;
	lastDraw: google.maps.Polygon;
	lastFixed: google.maps.Polygon;
	apiReady: Promise<void>;
	mapReady: Promise<void>;
	mapResolve: () => void;

	_lat: number;
	_lng: number;
	_zoom: number;

	constructor(private _loader: MapsAPILoader) {
		this.apiReady = this._loader.load();
		this.mapReady = new Promise<void>((resolve) => {
			this.mapResolve = resolve;
		});
	}

	ngOnInit() {
		this.apiReady.then(() => {
			this._createMap();
			this._setDrawingManager();
			this._addEventsListener();
			this.mapResolve();
		});
	}

	private _createMap() {
		let elem = this.mapRef.nativeElement;
		this.map = new google.maps.Map(elem, {
			center: {
				lat: 0.0,
				lng: 0.0
			},
			zoom: 1,
			streetViewControl: false
		});
		this.mapResolve();
		console.log('CREATED MAP');
	}

	private _setDrawingManager() {
		this.drawManager = new google.maps.drawing.DrawingManager({
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: [
					google.maps.drawing.OverlayType.POLYGON
				]
			},
			polygonOptions: {
				draggable: true,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0000FF',
				fillOpacity: 0.35,
				zIndex: 1
			}
		});
		this.drawManager.setMap(this.map);
	}

	private _addEventsListener() {
		google.maps.event.addListener(
			this.drawManager, 
			'polygoncomplete', 
			(polygon: google.maps.Polygon) => {

				this.clearDraw();
				this.lastDraw = polygon;

				let result = [];
				let points = polygon.getPath().getArray()
				if (points.length <= 0) return;

				for(let i=0; i < points.length + 1; i++) {
					let p = points[i % points.length];
					result.push([p.lat(), p.lng()]);
				}

				this.doneDrawing.emit(result);
			}
		);
	}

	public triggerResize() {
		const map = this.mapRef.nativeElement;
		google.maps.event.trigger(map, 'resize');
		console.log('Trigger!!!!');
	}

	@Input()
	set polygon(points) {
		if (points === undefined) return;
		this.mapReady.then(() => {
			this.clearDraw();
			this.lastDraw = new google.maps.Polygon({
				paths: points,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0000FF',
				fillOpacity: 0.35,
				zIndex: 1
			});
			this.lastDraw.setMap(this.map);
			console.log('CREATED POLYGON');
		});
	}

	@Input()
	set fixedPolygon(points) {
		if (points === undefined) return;
		this.mapReady.then(() => {
			this.clearFixed();
			this.lastFixed = new google.maps.Polygon({
				paths: points,
				strokeColor: '#000000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#000000',
				fillOpacity: 0.35,
				zIndex: 0
			});
			this.lastFixed.setMap(this.map);
			console.log('CREATED POLYGON');
		});
	}

	@Input()
	set lat(val: number) {
		this._lat = val;
		this.setCenter();
	}

	get lat() {
		return this._lat;
	}

	@Input()
	set lng(val: number) {
		this._lng = val;
		this.setCenter();
	}

	get lng() {
		return this._lng;
	}

	@Input() 
	set zoom(val: number) {
		this._zoom = val;
		this.setZoom();
	}

	get zoom() {
		return this._zoom;
	}

	fitPolygonBounds(points: any[]) {
		this.mapReady.then(() => {
			let bounds = this.getPolygonBounds(points);
			this.map.fitBounds(bounds);
			this.map.setCenter(bounds.getCenter());
		});
	}

	getPolygonBounds(points: any[]) {
		let bounds = new google.maps.LatLngBounds();
		points.forEach((p) => bounds.extend(p));
		return bounds;
	}

	setZoom() {
		this.mapReady.then(() => {
			this.map.setZoom(this.zoom)
		});
	}

	setCenter() {
		console.log(this._lat, this._lng);
		if (this._lat === undefined) return;
		if (this._lng === undefined) return;
		this.mapReady.then(() => {
			this.map.setCenter({
				lat: this._lat,
				lng: this._lng
			});
		});
	}

	clearDraw() {
		if (this.lastDraw !== undefined) {
			this.lastDraw.setMap(null);
			this.lastDraw = undefined;
		}
	}

	clearFixed() {
		if (this.lastFixed !== undefined) {
			this.lastFixed.setMap(null);
			this.lastFixed = undefined;
		}
	}
}
