import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatsComponent } from './job-stats.component';

describe('JobStatsComponent', () => {
  let component: JobStatsComponent;
  let fixture: ComponentFixture<JobStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
