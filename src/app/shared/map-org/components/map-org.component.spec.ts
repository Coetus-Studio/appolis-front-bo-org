import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOrgComponent } from './map-org.component';

describe('MapOrgComponent', () => {
  let component: MapOrgComponent;
  let fixture: ComponentFixture<MapOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapOrgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
