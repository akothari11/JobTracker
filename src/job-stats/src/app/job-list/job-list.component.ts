import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JobEditModalComponent } from '../job-edit/job-edit-modal.component';
import { JobServiceService, JobDetails } from '../job-service.service';
import { AuthenticationService } from '../authentication.service';



@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})

export class JobListComponent implements OnDestroy {

  /* The object containing the jobs that will be displayed in the job list table */
  public jobs: JobDetails[];

  /* The object containing all jobs of a user */
  public jobList: JobDetails[];

  public numJobs: number;

  /* The text from the search input field */
  public searchValue: string;

  /* Keep track of error response */
  public jobListError: boolean;
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private jobService: JobServiceService, private authService: AuthenticationService) {
    this.jobService.getJobs(this.authService.getUserDetails()._id).subscribe((data: JobDetails[]) => {
      this.jobListError = false;
      this.jobs = data;
      this.jobList = data;
      this.numJobs = this.jobs.length;
    }, (err) => {
      this.jobListError = true;
      console.error(err);
    });
  }

  /**
   * Close active modal when navigating between routes
   */
  public ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
  }

  /**
   * Open the edit modal
   * @param id job id
   */
  public openModal(id: string): void {
    this.modalRef = this.modalService.open(JobEditModalComponent);
    this.modalRef.componentInstance.jobId = id;
  }

  /**
   * Search all jobs for a value that contains the search text
   */
  public searchJobs(): void {
    const foundJobs = [];
    const allJobs = this.jobList;
    if (this.searchValue && this.searchValue !== '') {
      for (const job of allJobs) {

        // Search all keys of job object for search value and add to found jobs if it has not already been found
        if (job.company.toUpperCase().indexOf(this.searchValue.toUpperCase()) >= 0) {
          if (!foundJobs.includes(job)) {
            foundJobs.push(job);
          }
        }
        if (job.position.toUpperCase().indexOf(this.searchValue.toUpperCase()) >= 0) {
          if (!foundJobs.includes(job)) {
            foundJobs.push(job);
          }
        }
        if (job.location.toUpperCase().indexOf(this.searchValue.toUpperCase()) >= 0) {
          if (!foundJobs.includes(job)) {
            foundJobs.push(job);
          }
        }
        if (this.parseDate(job.date).toUpperCase().indexOf(this.searchValue.toUpperCase()) >= 0) {
          if (!foundJobs.includes(job)) {
            foundJobs.push(job);
          }
        }
        if (job.status.toUpperCase().indexOf(this.searchValue.toUpperCase()) >= 0) {
          if (!foundJobs.includes(job)) {
            foundJobs.push(job);
          }
        }
      }

      // When no jobs are found, clear this list of jobs to display
      if (foundJobs.length === 0) {
        this.jobs = [];
      } else {
        this.jobs = foundJobs;
      }
    } else {
      this.jobs = allJobs;
    }
  }

  /**
   * Covert an ISO formatted date into mm/dd/yyyy
   * @param date a date in an ISO format
   */
  public parseDate(date: string): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const dt = dateObj.getDate() + 1;
    let day = dt.toString();
    let mo = month.toString();
    if (dt < 10) {
          day = '0' + dt;
        }
    if (month < 10) {
          mo = '0' + month;
        }
    return `${mo}/${day}/${year}`;
  }

}
