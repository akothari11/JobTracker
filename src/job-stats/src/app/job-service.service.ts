import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobData } from './job-add/job-add.component';
import { Observable } from 'rxjs';

export interface JobDetails {
  company: string;
  date: string;
  position: string;
  location: string;
  status: string;
  userId: string;
  _id: string;
  applicationUrl: string;
  notes: string;
}

/* Service to handle CRUD operations for jobs */
@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private http: HttpClient) { }

  /**
   * Get list of companies that match company name from clearbit API
   * @param companyName name of the company to search
   */
  public queryCompanies(companyName: string): Observable<any>  {
    const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`;
    return(this.http.get(url));
  }

  /**
   * Retrieve all jobs of a user
   * @param userId the id of a user
   */
  public getJobs(userId: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/jobs/joblist/${userId}`);
  }

  /**
   * Get the details of a job given an id
   * @param id the id of a job
   */
  public getJob(id: string): Observable<any>  {
    return this.http.get(`http://localhost:8000/api/jobs/job/${id}`);
  }

  /**
   * Create a new job entry
   * @param data the job application data
   */
  public createJob(data: JobData): Observable<any>  {
    return this.http.post('http://localhost:8000/api/jobs', data);
  }

  /**
   * Delete a job
   * @param id the id of a job
   */
  public deleteJob(id: string): Observable<any>  {
    return this.http.delete(`http://localhost:8000/api/jobs/${id}`);
  }

  /**
   * Update an entry of a job
   * @param data the job application data
   */
  public updateJob(data: JobData): Observable<any>  {
    return this.http.put('http://localhost:8000/api/jobs', data);
  }
}
