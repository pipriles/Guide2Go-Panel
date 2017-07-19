import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import {
	BrowserAnimationsModule 
} from '@angular/platform-browser/animations';

// Vendor
import 'hammerjs';
import 'materialize-css';

import { CustomHttpModule } from './modules';
import { AppRoutes, AppComponent } from './app.component';
import { 
	LoginComponent,
	PanelComponent,
	HomeComponent,
	MapComponent,

	// Esto se puede meter en un modulo
	ZonesComponent, 
	ZonesMapComponent,
	ZonesAddComponent,
	ZonesEditComponent,

	SubZonesComponent,
	SubZonesMapComponent,
	SubZonesAddComponent,
	SubZonesEditComponent,

	SpotsComponent,
	SpotsAddComponent,
	SpotsEditComponent,

	UsersComponent,
	UsersAddComponent,
	UsersEditComponent,

	GuidesComponent,
	GuidesAddComponent,
	GuidesEditComponent,

} from './components';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		PanelComponent,
		HomeComponent,
		MapComponent,

		ZonesComponent,
		ZonesMapComponent,
		ZonesAddComponent,
		ZonesEditComponent,

		SubZonesComponent,
		SubZonesMapComponent,
		SubZonesAddComponent,
		SubZonesEditComponent,

		SpotsComponent,
		SpotsAddComponent,
		SpotsEditComponent,

		UsersComponent,
		UsersAddComponent,
		UsersEditComponent,

		GuidesComponent,
		GuidesAddComponent,
		GuidesEditComponent,

	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutes,
		CustomHttpModule,

		// Angular Material
		MaterialModule,
		BrowserAnimationsModule,
		NgxDatatableModule,

		AgmCoreModule.forRoot({
			// Verificar de quien es esta llave
			apiKey: 'AIzaSyB1-InqkExqKsUlO-Xd7EJ6_RV4CR4UWAc',
			libraries: ['places', 'drawing']
		})
	],
	// Necesario?
	entryComponents: [
		AppComponent,
		LoginComponent,
		HomeComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
