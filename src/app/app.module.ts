import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {
	BrowserAnimationsModule 
} from '@angular/platform-browser/animations';

// Vendor
import 'hammerjs';
import 'materialize-css';

import { CustomHttpModule } from './modules';
import { AppRoutes, AppComponent } from './app.component';
import { 
	WelcomeComponent, 
	LoginComponent 
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
		FormsModule,
		AppRoutes,
		CustomHttpModule,

		// Angular Material
		MaterialModule,
		BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
