import { 
	Component, Input, Output, EventEmitter,
	ViewChild, ElementRef, OnInit
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	@Output('polygonComplete') 
	doneDrawing = new EventEmitter();

	@Output('markerComplete')
	doneMarking = new EventEmitter();

	@Input()
	mode: string;

	@ViewChild('map') 
	mapRef: ElementRef;

	map: google.maps.Map;
	drawManager: google.maps.drawing.DrawingManager;
	lastMark: google.maps.Marker;
	lastPoly: google.maps.Polygon;
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
				drawingModes: [ this._drawingMode() ]
			},
			polygonOptions: {
				draggable: true,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0000FF',
				fillOpacity: 0.35,
				zIndex: 1,
			},
			markerOptions: {
				animation: google.maps.Animation.DROP,
				draggable: true,
				position: undefined
			},
			map: this.map
		});
	}

	private _drawingMode() : google.maps.drawing.OverlayType {
		return (this.mode === 'marker')
			? google.maps.drawing.OverlayType.MARKER
			: google.maps.drawing.OverlayType.POLYGON;
	}

	private _addEventsListener() {
		this._polygonEvent();
		this._markerEvent();
	}

	private _polygonEvent() {
		google.maps.event.addListener(
			this.drawManager, 
			'polygoncomplete', 
			(polygon: google.maps.Polygon) => {

				this.clearOverlay(this.lastPoly);
				this.lastPoly = polygon;

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

	private _markerEvent() {
		google.maps.event.addListener(
			this.drawManager, 
			'markercomplete', 
			(marker: google.maps.Marker) => {

				console.log(this.lastMark);
				this.clearOverlay(this.lastMark);
				this.lastMark = marker;

				let point = marker.getPosition();
				let coord = [point.lat(), point.lng()];
				this.doneMarking.emit(coord);

				return coord;
			}
		);
	}

	public triggerResize() {
		const map = this.mapRef.nativeElement;
		google.maps.event.trigger(map, 'resize');
		console.log('Trigger!!!!');
	}

	@Input()
	set marker(point) {
		if (point === undefined) return;
		this.mapReady.then(() => {
			this.clearOverlay(this.lastMark);
			this.lastMark = new google.maps.Marker({
				position: point,
				animation: google.maps.Animation.DROP,
				map: this.map
			});
		});
	}

	@Input()
	set polygon(points) {
		if (points === undefined) return;
		this.mapReady.then(() => {
			console.log('CREATED POLYGON');
			this.clearOverlay(this.lastPoly);
			this.lastPoly = new google.maps.Polygon({
				paths: points,
				strokeColor: '#0000FF',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0000FF',
				fillOpacity: 0.35,
				zIndex: 1,
				map: this.map
			});
		});
	}

	@Input()
	set fixedPolygon(points) {
		if (points === undefined) return;
		this.mapReady.then(() => {
			console.log('CREATED POLYGON');
			this.clearOverlay(this.lastFixed);
			this.lastFixed = new google.maps.Polygon({
				paths: points,
				strokeColor: '#000000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#000000',
				fillOpacity: 0.35,
				zIndex: 0,
				map: this.map
			});
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
		if (this._lat === undefined) return;
		if (this._lng === undefined) return;
		this.mapReady.then(() => {
			this.map.setCenter({
				lat: this._lat,
				lng: this._lng
			});
		});
	}

	clearOverlay(overlay) {
		if (overlay === undefined) return;
		overlay.setMap(null);
	}

}
