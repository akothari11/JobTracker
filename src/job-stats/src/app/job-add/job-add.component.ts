import { Component, OnInit, ViewChild } from '@angular/core';
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
  date: Date;
  userId: string;
  applicationUrl: string;
  jobNotes: string;
}

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {
  @ViewChild('jobForm' , {static: false}) public jobForm: JobFormComponent;
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

  ngOnInit() {
  }

  public goBack() {
    this.locationService.back();
  }
  public createJob() {
    const formData: JobData = {
      company: this.jobForm.company,
      position: this.jobForm.position,
      location: this.jobForm.location,
      date: this.jobForm.appliedDate,
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

  public validateJobForm() {
    this.jobForm.invalidCompany = this.jobForm.company.length <= 0;
    this.jobForm.invalidPosition = this.jobForm.position.length <= 0;
    this.jobForm.invalidLocation = this.jobForm.location.length <= 0;
    this.jobForm.invalidDate = this.jobForm.appliedDate.length <= 0;
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
