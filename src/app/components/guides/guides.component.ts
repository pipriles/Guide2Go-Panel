import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { GuidesService } from '../../services';

@Component({
	selector: 'app-guides',
	templateUrl: './guides.component.html',
	styleUrls: ['./guides.component.scss'],
  providers: [ GuidesService ]
})
export class GuidesComponent {
	@ViewChild('table') 
  table: DatatableComponent;

	rows  = [];
	cols  = [];
	cache = [];
	selection: any;

  constructor(private _guideServ: GuidesService) {
  	this.cols = [{ name: 'Nombre', prop: 'name' },{ name: 'Idioma', prop: 'idioma'}];
   }

  ngOnInit() {
    this.fetchGuides();
  }
 
  fetchGuides(){
    this._guideServ.get().subscribe(
        (guide) => this.initTable(guide.guides),
        (error) => console.log(error)
      ); 
  }

  initTable(guide: any[]) {
    this.cache = guide;
    this.rows  = guide;
  }

  filterGuides(event: KeyboardEvent) {
    let filter = (<HTMLInputElement>event.target).value.toLowerCase();
    let matchs = this.cache.filter((guide) => {
      return guide.name.toLowerCase().indexOf(filter) !== -1 || !filter;
    });

    this.rows = matchs;
    this.table.offset = 0;
  }

  handleAdd(guide)  {
    
    this.fetchGuides();
  }
 
  selectGuide(event) {
    this.selection = event.selected[0];
    console.log('Selection: ', this.selection);
  }

  isSelected() {
    return (this.selection) ? true : false;
  }

  handleEdit(guide) {
    console.log(guide);
    this.selection = undefined;
    this.fetchGuides();
  }
 
}
