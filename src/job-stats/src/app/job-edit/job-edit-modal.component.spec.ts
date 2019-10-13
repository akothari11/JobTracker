import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditModalComponent } from './job-edit-modal.component';

describe('JobEditComponent', () => {
  let component: JobEditModalComponent;
  let fixture: ComponentFixture<JobEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
