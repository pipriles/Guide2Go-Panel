import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from '@swimlane/ngx-datatable';

@Component({
	selector: 'app-zones',
	templateUrl: './zones.component.html',
	styleUrls: ['./zones.component.scss']
})
export class ZonesComponent {

	rows: Object[];
	cols: Object[];

	constructor() {

		this.rows = [
			{ name: 'Austin', gender: 'Male', company: 'Swimlane' },
			{ name: 'Dany', gender: 'Male', company: 'KFC' },
			{ name: 'Molly', gender: 'Female', company: 'Burger King' },
		];

		this.cols = [
			{ prop: 'name' },
			{ name: 'Gender' },
			{ name: 'Company' }
		];
	}

}
