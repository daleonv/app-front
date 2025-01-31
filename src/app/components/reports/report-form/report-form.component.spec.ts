import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFormComponent } from './report-form.component';

describe('ReportsComponent', () => {
  let component: ReportsFormComponent;
  let fixture: ComponentFixture<ReportsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
