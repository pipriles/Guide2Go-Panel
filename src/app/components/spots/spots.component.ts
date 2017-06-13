import { Component, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { SpotsService } from '../../services';

@Component({
	selector: 'app-spots',
	templateUrl: './spots.component.html',
	styleUrls: ['./spots.component.scss'],
	providers: [ SpotsService ]
})
export class SpotsComponent implements OnInit {

	@ViewChild('table') 
	table: DatatableComponent;

	// Cache para las paradas
	spots = [];

	// Sub zonas
	rows  = [];
	cols  = [];
	cache = [];
	selection: any;

	constructor(private _spotServ: SpotsService) {
		this.cols = [{ name: 'Nombre', prop: 'nombre' }];
	}

	ngOnInit() { 
		this.fetchSubZones();
		this.fetchSpots(); 
	} 

	fetchSpots() {
		console.log('Spots Fetched!');
		this._spotServ.get()
			.subscribe(
				spots => this.initTable(spots),
				error => console.log(error)
			);
	}

	fetchSubZones() {
		/* Fetch sub zones */
		console.log('Sub Zones Fetched!');
		//		this._subZoneServ.get()
		//			.subscribe(
		//				zones => this.initTable(zones),
		//				error => console.log(error)
		//			);
	}

	initTable(spots: any[]) {
		this.cache = spots;
		this.rows  = spots;
	}

	testSpots() {
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
		console.log('Edited!', zone);
		this.selection.nombre = zone.nombre;
		this.selection.zonas_id = zone.zonas_id;
		this.selection.poligono = zone.poligono;
		this.fetchSubZones();
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
