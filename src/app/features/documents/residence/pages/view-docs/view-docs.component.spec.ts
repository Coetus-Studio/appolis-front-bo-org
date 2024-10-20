import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocsComponent } from './view-docs.component';

describe('ViewDocsComponent', () => {
  let component: ViewDocsComponent;
  let fixture: ComponentFixture<ViewDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
