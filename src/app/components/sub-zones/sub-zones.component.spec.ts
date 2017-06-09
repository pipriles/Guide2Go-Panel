import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubZonesComponent } from './sub-zones.component';

describe('SubZonesComponent', () => {
  let component: SubZonesComponent;
  let fixture: ComponentFixture<SubZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
