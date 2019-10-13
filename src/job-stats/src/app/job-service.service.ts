import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobData } from './job-add/job-add.component';

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

  public jobUpdate(data: JobData) {

  }

  public jobDelete(data: JobData) {

  }

  /**
   * Retrieve all jobs of a user
   */
  public getJobs(userId: string) {
    return this.http.get(`http://localhost:8000/jobs/joblist/${userId}`);
  }

  /**
   * Get the details of a job given an id
   */
  public getJob(id: string) {
    return this.http.get(`http://localhost:8000/jobs/job/${id}`);
  }

  /**
   * Create a new job entry
   */
  public createJob(data: JobData) {
    return this.http.post('http://localhost:8000/jobs', data);
  }

  /**
   * Delete a job
   */
  public deleteJob(id: string) {
    return this.http.delete(`http://localhost:8000/jobs/${id}`);
  }

  /**
   * Update an entry of a job
   */
  public updateJob(data: JobData) {
    return this.http.put('http://localhost:8000/jobs', data);
  }
}
