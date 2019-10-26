import { Component, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobServiceService } from '../job-service.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-job-edit-modal',
  templateUrl: './job-edit-modal.component.html',
  styleUrls: ['./job-edit-modal.component.scss']
})
export class JobEditModalComponent  {

  @Input() public jobId: string;
  @ViewChild('jobForm' , {static: false}) public jobForm: JobFormComponent;
  public company: string;
  public date: any;
  public location: string;
  public status: string;
  public position: string;
  public statusOptions: any = [
    'Applied',
    'Phone Interview',
    'On-site Interview',
    'Offer',
    'Accepted',
    'Rejected',
    'Declined',
  ];
  public updateJobError: boolean;

  constructor(private activeModal: NgbActiveModal, private jobService: JobServiceService, private authService: AuthenticationService) {
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
      // TODO: Update how page is updated after a CRUD operation is performed
      this.activeModal.close();
      document.location.reload();
    }, (err) => {
      alert('There was an error deleting the job. Please try again');
      console.error(err);
    });
  }

  /**
   * Close the active modal
   */
  public closeModal() {
    this.activeModal.close();
  }

  /**
   * Update the details of a job
   */
  private updateJob(): void {
    const data: any = {
      jobId: this.jobId,
      formData: {
        company: this.jobForm.company.name,
        position: this.jobForm.position,
        location: this.jobForm.location,
        date: this.jobForm.appliedDate,
        status: this.jobForm.status,
        userId: this.authService.getUserDetails()._id,
        applicationUrl: this.jobForm.applicationUrl,
        jobNotes: '',
      },
    };

    this.jobService.updateJob(data).subscribe(() => {
      // TODO: Update how page is updated after a CRUD operation is performed
      this.updateJobError = false;
      this.activeModal.close();
      document.location.reload();

    }, (err) => {
      this.updateJobError = true;
      console.error(err);
    });

  }
}
