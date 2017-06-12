import { 
	Component, Input, Output, EventEmitter,
	ViewChild, ElementRef, OnInit
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
	selector: 'app-zones-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class ZonesMapComponent implements OnInit {

	@Input() lat: number;
	@Input() lng: number;
	@Input() zoom: number;

	@Output('polygonComplete') 
	doneDrawing = new EventEmitter();

	@ViewChild('map') 
	mapRef: ElementRef;

	map: google.maps.Map;
	drawManager: google.maps.drawing.DrawingManager;
	lastDraw: google.maps.Polygon;
	apiReady: Promise<void>;
	mapReady: Promise<void>;
	mapResolve: () => void;

	constructor(private _loader: MapsAPILoader) {
		this.apiReady = this._loader.load();
		this.mapReady = new Promise<void>((resolve) => this.mapResolve = resolve);
	}

	ngOnInit() {
		if (this.lat  == null) this.lat = 0.0;
		if (this.lng  == null) this.lng = 0.0;
		if (this.zoom == null) this.zoom = 2;
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
				lat: this.lat,
				lng: this.lng
			},
			zoom: this.zoom,
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
				strokeColor: '#000000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#000000',
				fillOpacity: 0.35
			});
			this.lastDraw.setMap(this.map);
			console.log('CREATED POLYGON');
		});
	}

	clearDraw() {
		if (this.lastDraw !== undefined) {
			this.lastDraw.setMap(null);
			this.lastDraw = undefined;
		}
	}

}
