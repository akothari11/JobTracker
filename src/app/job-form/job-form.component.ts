import { Component, Input, AfterViewInit } from '@angular/core';
import { JobServiceService, JobDetails } from '../job-service.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements AfterViewInit {
  @Input() public editMode: boolean;
  @Input() public detailsRoute: boolean;
  @Input() public jobId: string;

  public company: any = '';
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
  public companyLogo = '';
  public invalidCompany: boolean;
  public invalidPosition: boolean;
  public invalidLocation: boolean;
  public invalidDate: boolean;
  public invalidStatus: boolean;
  public retrieveJobDetailsError: boolean;
  public companyList = [];

  /**
   * Search function for bootstrap's typeahead on a input field
   */
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => {
        this.queryCompanies();
        return term.length < 1 ? [] : this.companyList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }
    )
  )

  /**
   * Formatter for bootstrap's typeahead on a input field
   */
  formatter = (x: {name: string}) => x.name;

  constructor(private jobService: JobServiceService) { }

  /**
   * Set details of form when opening edit modal
   */
  public ngAfterViewInit(): void {
    if (this.jobId) {
      this.setJobDetails(this.jobId);
    }
  }

  /**
   * Set the company logo when selecting a company from the company list
   * @param $event the selected item in the list
   */
  public itemSelected($event) {
    this.companyLogo = $event.item.logo;
  }

  /**
   * Get list of companies that match the text entered in the company input field
   */
  public queryCompanies() {
    if (this.company) {
      this.jobService.queryCompanies(this.company).subscribe((data: any) => {
        this.companyList = data;
      });
    }
  }

  private setJobDetails(id: string): void {
    this.jobService.getJob(id).subscribe((data: any) => {
      if (data && data.length === 1) {
        this.retrieveJobDetailsError = false;
        const job: JobDetails = data[0];
        this.company = {name: job.company};
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

  private parseDate(date: any): NgbDateStruct {
    const dateObj = new Date(date);
    const yearValue = dateObj.getFullYear();
    const monthValue = dateObj.getUTCMonth() + 1;
    const dt = dateObj.getUTCDate();
    let dayValue = dt.toString();
    let mo = monthValue.toString();
    if (dt < 10) {
      dayValue = '0' + dt;
    }
    if (monthValue < 10) {
      mo = '0' + monthValue;
    }
    // Return the data in json object for ngbDatePicker
    const ngbDateObj: NgbDateStruct = {
      year: yearValue,
      month: parseInt(mo, 10),
      day: parseInt(dayValue, 10)
    };
    return ngbDateObj;
  }

}
