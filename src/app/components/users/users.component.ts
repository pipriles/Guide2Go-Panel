import { Component, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	rows  = [];
	cols  = [];
	cache = [];
	selection: any;

  constructor() {
  	this.cols = [{ name: 'Nombre', prop: 'nombre' }];
   }

  ngOnInit() {
  }
 
}
