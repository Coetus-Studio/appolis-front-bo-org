import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocsComponent } from './create-docs.component';

describe('CreateDocsComponent', () => {
  let component: CreateDocsComponent;
  let fixture: ComponentFixture<CreateDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
