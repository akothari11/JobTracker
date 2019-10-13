import { Component, Input, AfterViewInit } from '@angular/core';
import { JobServiceService, JobDetails } from '../job-service.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements AfterViewInit {
  @Input() public editMode: boolean;
  @Input() public detailsRoute: boolean;
  @Input() public jobId: string;

  public company = '';
  public appliedDate: any = '';
  public location = '';
  public position = '';
  public applicationUrl = '';
  public statusOptions: any = [
    'Applied',
    'Phone Interview',
    'On-site Interview',
    'Offer',
    'Accepted',
    'Rejected',
    'Declined',
  ];
  public status: string = this.statusOptions[0];
  public jobNotes = '';

  public invalidCompany: boolean;
  public invalidPosition: boolean;
  public invalidLocation: boolean;
  public invalidDate: boolean;
  public invalidStatus: boolean;
  public retrieveJobDetailsError: boolean;
  constructor(private jobService: JobServiceService) { }

  /**
   * Set details of form when opening edit modal
   */
  ngAfterViewInit(): void {
    if (this.jobId) {
      this.setJobDetails(this.jobId);
    }
  }
  private setJobDetails(id: string): void {
    this.jobService.getJob(id).subscribe((data: any) => {
      if (data && data.length === 1) {
        this.retrieveJobDetailsError = false;
        const job: JobDetails = data[0];
        this.company = job.company;
        this.location = job.location;
        this.status = job.status;
        this.position = job.position;
        this.applicationUrl = job.applicationUrl;
        this.appliedDate = this.parseDate(job.date);
        this.jobNotes = job.notes;

      }
    }, (err) => {
      this.retrieveJobDetailsError = true;
      console.error(err);
    });
  }

  private parseDate(date: any): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const dt = dateObj.getUTCDate();
    let day = dt.toString();
    let mo = month.toString();
    if (dt < 10) {
          day = '0' + dt;
        }
    if (month < 10) {
          mo = '0' + month;
        }
    return year + '-' + mo + '-' + day;
  }

}
