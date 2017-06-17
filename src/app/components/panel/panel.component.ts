import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

	pages: any[];

	constructor() {
		this.pages = [
			{ name: 'Guias', route: '/guias' },
			{ name: 'Zonas', route: '/zonas' },
			{ name: 'Sub Zonas', route: '/sub-zonas' },
			{ name: 'Paradas', route: '/paradas' },
			{ name: 'Usuarios', route: '/usuarios'}
		];
	}


}
