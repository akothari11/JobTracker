import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobServiceService } from '../job-service.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent  {
  @ViewChild('jobForm' , {static: false}) public jobForm: JobFormComponent;
  public jobId: string;
  public updateJobError: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobServiceService,
    private authService: AuthenticationService
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id');
  }

  /**
   * Check that all fields have text entered
   */
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
      this.updateJob();
    }
  }

  /**
   * Remove a job from the list
   */
  public deleteJob(): void {
    this.jobService.deleteJob(this.jobId).subscribe((data: any) => {
      this.router.navigateByUrl('/job-list');
    }, (err) => {
      alert('There was an error deleting the job. Please try again');
      console.error(err);
    });
  }

  /**
   * Update the details of a job
   */
  private updateJob(): void {
    const data: any = {
      jobId: this.jobId,
      formData: {
        company: this.jobForm.company,
        position: this.jobForm.position,
        location: this.jobForm.location,
        date: this.jobForm.appliedDate,
        status: this.jobForm.status,
        userId: this.authService.getUserDetails()._id,
        applicationUrl: this.jobForm.applicationUrl,
        jobNotes: this.jobForm.jobNotes
      },
    };

    this.jobService.updateJob(data).subscribe(() => {
      this.updateJobError = false;
      this.router.navigateByUrl('/job-list');

    }, (err) => {
      this.updateJobError = true;
      console.error(err);
    });

  }
}
