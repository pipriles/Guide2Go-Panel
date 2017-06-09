import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
	LoginComponent,
	HomeComponent, 
	ZonesComponent,
	SubZonesComponent,
	SpotsComponent
} from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'zonas', component: ZonesComponent },
	{ path: 'sub-zonas', component: SubZonesComponent },
	{ path: 'paradas', component: SpotsComponent },
  { path: '',
    redirectTo: '/login', pathMatch: 'full'
  },
  { path: '**', redirectTo: '/home' }

];
export const AppRoutes = RouterModule.forRoot(routes)

