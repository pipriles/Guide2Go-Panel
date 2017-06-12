import { 
	Component, Input, ElementRef, Output, EventEmitter, OnInit 
} from '@angular/core';
import { ZonesService } from '../../../services';

@Component({
	selector: 'app-zones-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class ZonesAddComponent implements OnInit {

	@Output('request') zoneUploaded = new EventEmitter();

	zone: any;

	constructor(private zoneServ: ZonesService) {
		this.zone = { name: '', polygon: [] };
	}

	ngOnInit() {}

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

	setPolygon(polygon) {
		this.zone.polygon = polygon;
	}

}

