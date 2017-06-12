import { Component, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { ZonesService } from '../../services';

@Component({
	selector: 'app-zones',
	templateUrl: './zones.component.html',
	styleUrls: ['./zones.component.scss'],
	providers: [ ZonesService ]
})
export class ZonesComponent implements OnInit {

	@ViewChild('table') table: DatatableComponent;

	rows = [];
	cols = [];
	cache = [];
	filterVal: string;

	constructor(private zoneServ: ZonesService) {
		this.cols = [{ name: 'Nombre', prop: 'name' }];
		this.filterVal = '';
	}

	ngOnInit() {
		this.fetchZones();
	}

	fetchZones() {
		this.zoneServ.get()
			.subscribe(
				zones => this.initTable(zones),
				error => console.log(error)
			);
	}

	initTable(zones: any[]) {
		this.cache = zones;
		this.rows  = zones;
	}

	testZones() {
		console.log(this.rows);
		console.log(this.cache);
	}

	filterZones(event: KeyboardEvent) {
		let filter = (<HTMLInputElement>event.target).value.toLowerCase();
		let matchs = this.cache.filter((zone) => {
			return zone.name.toLowerCase().indexOf(filter) !== -1 || !filter;
		});

		this.rows = matchs;
		this.table.offset = 0;
	}

	handleUpload(zone)	{
		// Actualiza las filas con la zona nueva
		this.rows = [...this.rows, zone];
	}
}
