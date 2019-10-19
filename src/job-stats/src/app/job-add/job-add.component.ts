import { Component, ViewChild } from '@angular/core';
import { JobServiceService } from '../job-service.service';
import { Router } from '@angular/router';
import { JobFormComponent } from '../job-form/job-form.component';
import { AuthenticationService } from '../authentication.service';
import { Location } from '@angular/common';

export interface JobData {
  company: string;
  position: string;
  location: string;
  status: string;
  date: string;
  userId: string;
  applicationUrl: string;
  jobNotes: string;
}

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent {

  /**
   * Directive to access the job form component instance
   */
  @ViewChild('jobForm' , {static: false}) public jobForm: JobFormComponent;

  /**
   * Data for job form input fields
   */
  public date: Date;
  public company: string;
  public status: string;
  public position: string;
  public location: string;
  public statusOptions: any = [
    'Applied',
    'Phone Interview',
    'On-site Interview',
    'Offer',
    'Accepted',
    'Rejected',
    'Declined',
  ];
  public jobAddError: boolean;
  constructor(
    private jobService: JobServiceService,
    private router: Router,
    private authService: AuthenticationService,
    private locationService: Location) {
   }

  /**
   * Routes user to previous page
   */
  public goBack(): void {
    this.locationService.back();
  }
  /**
   * Create a job using the job service
   */
  public createJob(): void {
    const dateString = `${this.jobForm.appliedDate.year}-${this.jobForm.appliedDate.month}-${this.jobForm.appliedDate.day}`;
    const formData: JobData = {
      company: this.jobForm.company,
      position: this.jobForm.position,
      location: this.jobForm.location,
      date: dateString,
      status: this.jobForm.status,
      userId: this.authService.getUserDetails()._id,
      applicationUrl: this.jobForm.applicationUrl,
      jobNotes: ''
    };
    this.jobService.createJob(formData).subscribe((data: any) => {
      this.jobAddError = false;
      this.router.navigate(['job-list']);
    }, (err) => {
      this.jobAddError = true;
      console.error(err);
    });
  }

  /**
   * Validate all the fields of the add form and create job after clicking add
   */
  public validateJobForm(): void {
    // tslint:disable-next-line: max-line-length
    const isDateValid = this.jobForm.appliedDate.year === undefined || this.jobForm.appliedDate.month === undefined || this.jobForm.appliedDate.day === undefined;
    this.jobForm.invalidCompany = this.jobForm.company.length <= 0;
    this.jobForm.invalidPosition = this.jobForm.position.length <= 0;
    this.jobForm.invalidLocation = this.jobForm.location.length <= 0;
    this.jobForm.invalidDate = isDateValid;
    this.jobForm.invalidStatus = this.jobForm.status.length <= 0;
    // tslint:disable-next-line: max-line-length
    if (!this.jobForm.invalidCompany && !this.jobForm.invalidPosition && !this.jobForm.invalidLocation && !this.jobForm.invalidDate && !this.jobForm.invalidStatus) {
      this.jobForm.invalidCompany = false;
      this.jobForm.invalidPosition = false;
      this.jobForm.invalidLocation = false;
      this.jobForm.invalidDate = false;
      this.jobForm.invalidStatus = false;
      this.createJob();
    }
  }

}
