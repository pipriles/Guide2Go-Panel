import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { UsersService } from '../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ UsersService ]
})
export class UsersComponent implements OnInit {

  @ViewChild('table') 
  table: DatatableComponent;

	rows  = [];
	cols  = [];
	cache = [];
	selection: any;

  constructor(private _userServ: UsersService) {
  	this.cols = [{ name: 'Nombre', prop: 'name' }];
   }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(){
    this._userServ.get().subscribe(
        (user) => this.initTable(user.users),
        (error) => console.log(error)
      ); 
  }

  initTable(user: any[]) {
    this.cache = user;
    this.rows  = user;
  }

  filterUsers(event: KeyboardEvent) {
    let filter = (<HTMLInputElement>event.target).value.toLowerCase();
    let matchs = this.cache.filter((user) => {
      return user.name.toLowerCase().indexOf(filter) !== -1 || !filter;
    });

    this.rows = matchs;
    this.table.offset = 0;
  }

  handleAdd(user)  {
    // Actualiza las filas con el user nuevo
    this.fetchUsers();
  }

  selectUser(event) {
    this.selection = event.selected[0];
    console.log('Selection: ', this.selection);
  }

  isSelected() {
    return (this.selection) ? true : false;
  }

  handleEdit(user) {
    console.log(user);
    this.selection = undefined;
    this.fetchUsers();
  }
 
}
