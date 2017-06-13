import { Component, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { SubZonesService, ZonesService } from '../../services';

@Component({
  selector: 'app-sub-zones',
  templateUrl: './sub-zones.component.html',
  styleUrls: ['./sub-zones.component.scss'],
	providers: [ SubZonesService, ZonesService ]
})
export class SubZonesComponent {

	@ViewChild('table') 
	table: DatatableComponent;

	// Cache para las zonas
	zones = [];

	// Sub zonas
	rows  = [];
	cols  = [];
	cache = [];
	selection: any;

	constructor(
		private _subZoneServ: SubZonesService,
		private _zoneServ: ZonesService) {
		this.cols = [{ name: 'Nombre', prop: 'nombre' }];
	}

	ngOnInit() { 
		this.fetchSubZones();
		this.fetchZones(); 
	} 

	fetchZones() {
		console.log('Zones Fetched!');
		this._zoneServ.get()
			.subscribe(
				zones => this.zones = zones,
				error => console.log(error)
			);
	}

	fetchSubZones() {
		/* Fetch sub zones */
		console.log('Sub Zones Fetched!');
		this._subZoneServ.get()
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
			return zone.nombre.toLowerCase().indexOf(filter) !== -1 || !filter;
		});

		this.rows = matchs;
		this.table.offset = 0;
	}

	handleAdd(zone)	{
		// Actualiza las filas con la zona nueva
		this.fetchSubZones();
	}

	handleEdit(zone) {
		console.log('Edited!');
	}

	isSelected() {
		return (this.selection) ? true : false;
	}

	clearSelection() {
		this.selection = undefined;
		this.table.selected = [];
	}

	selectZone(event) {
		this.selection = event.selected[0];
		console.log('Selection: ', this.selection);
	}

}
