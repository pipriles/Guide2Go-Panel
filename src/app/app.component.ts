import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { 
	WelcomeComponent, 
	LoginComponent 
} from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: WelcomeComponent }

];
export const AppRoutes = RouterModule.forRoot(routes)

