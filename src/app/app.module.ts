import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
	ZonesComponent,
	SubZonesComponent,
	SpotsComponent,
	ZonesEditComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelComponent,
    HomeComponent,
    ZonesComponent,
    SubZonesComponent,
    SpotsComponent,
    ZonesEditComponent
  ],
  imports: [
    BrowserModule,
		FormsModule,
		AppRoutes,
		CustomHttpModule,

		// Angular Material
		MaterialModule,
		BrowserAnimationsModule,
		NgxDatatableModule
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
