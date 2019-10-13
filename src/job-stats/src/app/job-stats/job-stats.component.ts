import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { JobServiceService, JobDetails } from '../job-service.service';
import { AuthenticationService } from '../authentication.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-job-stats',
  templateUrl: './job-stats.component.html',
  styleUrls: ['./job-stats.component.scss']
})
export class JobStatsComponent implements OnInit {
  @ViewChild('jobChart', { static: true}) jobDoughnutChart: ElementRef;
  @ViewChild('jobBarChart', { static: true}) jobBarChart: ElementRef;
  public numJobs: number;
  public numApplied = 0;
  public numPhoneInterview = 0;
  public numOnSite = 0;
  public numOffer = 0;
  public numAccepted = 0;
  public numRejected = 0;
  public numDeclined = 0;
  public jobStatsError: boolean;
  // tslint:disable-next-line: object-literal-key-quotes
  public style = {'display': 'none'};
  private dateArray = [];
  private dateArrayData = [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];
  private jobsAdded = true;

  constructor(private jobService: JobServiceService, private authService: AuthenticationService) {
  }

  /**
   * Use Chart.js to create a doughnut and bar chart to display job stats
   */
  public ngOnInit() {
    this.retrieveDates();
    this.jobService.getJobs(this.authService.getUserDetails()._id).subscribe((data: JobDetails[]) => {

      // Find number of jobs in each status and number of jobs added within +/- 3 days
      this.numJobs = data.length;

      // Hide the container for the charts when no jobs are added
      // tslint:disable-next-line: object-literal-key-quotes
      this.style = {'display': this.numJobs > 0 ? 'block' : 'none'};
      for (const job of data) {
        for (let i = 0; i < this.dateArray.length; i++) {
          if (this.dateArray[i] === this.parseDate(job.date)) {
            this.dateArrayData[i] += 1;
          }
        }
        this.jobStageCalculation(job);
      }
    }, (err) => {
      this.jobStatsError = true;
      console.error(err);
    }, () => {

        // Find if no jobs have been applied to within +/- 3 days and set max y-axis of bar chart accordingly
        for (const numPerDate of this.dateArrayData) {
          this.jobsAdded = this.jobsAdded && numPerDate < 1;
        }
        const tickData = this.jobsAdded ? {
          display: false,
          beginAtZero: true,
          max: this.jobsAdded ? 1 : ''
        } : {
          display: false,
          beginAtZero: true,
        };
        if (this.jobBarChart || this.jobDoughnutChart) {
          this.createBarChart(tickData);
          this.createDoughnutChart();
        }
    });
  }

  private addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString();
  }

  private retrieveDates() {
    let counter = -6;
    for (let i = 0; i < 7; i++) {
      this.dateArray[i] = this.parseDate(this.addDays(Date.now(), counter));
      counter++;
    }
  }

  private parseDate(date: string): string {
    const dateObj = new Date(date);
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
    return `${mo}/${day}`;
  }

  private jobStageCalculation(job: any) {
    switch (job.status.toUpperCase()) {
      case 'APPLIED' : {
        this.numApplied++;
        break;
      }
      case 'PHONE INTERVIEW': {
        this.numPhoneInterview++;
        break;
      }
      case 'ON-SITE INTERVIEW': {
        this.numOnSite++;
        break;
      }
      case 'OFFER': {
        this.numOffer++;
        break;
      }
      case 'ACCEPTED': {
        this.numAccepted++;
        break;
      }
      case 'REJECTED': {
        this.numRejected++;
        break;
      }
      case 'DECLINED': {
        this.numDeclined++;
        break;
      }
    }
  }

  public createDoughnutChart() {
    const doughnutChart = new Chart(this.jobDoughnutChart.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [
          'Applied',
          'Phone Interview',
          'On-site Interview',
          'Offers',
          'Accepted',
          'Rejected',
          'Declined'
        ],
        datasets: [{
          backgroundColor: [
            '#98C1D9',
            '#7B6D8D',
            '#95a5a6',
            '#F0B67F',
            '#5D8970',
            '#EF6F6C',
            '#293241'
          ],
          data: [
            this.numApplied,
            this.numPhoneInterview,
            this.numOnSite,
            this.numOffer,
            this.numAccepted,
            this.numRejected,
            this.numDeclined
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Job Stages',
          fontSize: 18,
          fontStyle: 'bold',
          fontColor: '#000',
          padding: 20
        },
        layout: {
          padding: {
            top: 0,
          }
        },
        legend: {
          labels: {
            fontSize: 14,
            filter: (item, data) => {
              switch (item.text.toUpperCase()) {
                case 'APPLIED' : {
                  return (this.numApplied > 0);
                }
                case 'PHONE INTERVIEW': {
                  return (this.numPhoneInterview > 0);
                }
                case 'ON-SITE INTERVIEW': {
                  return (this.numOnSite > 0);
                }
                case 'OFFER': {
                  return (this.numOffer > 0);
                }
                case 'ACCEPTED': {
                  return (this.numAccepted > 0);
                }
                case 'REJECTED': {
                  return (this.numRejected > 0);
                }
                case 'DECLINED': {
                  return (this.numDeclined > 0);
                }
              }
            }
          }
        }
      }
    });
  }

  private createBarChart(tickData: any) {
    const barChart = new Chart(this.jobBarChart.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [
          this.dateArray[0],
          this.dateArray[1],
          this.dateArray[2],
          this.dateArray[3],
          this.dateArray[4],
          this.dateArray[5],
          this.dateArray[6]],
        datasets: [{
          data: [
            this.dateArrayData[0],
            this.dateArrayData[1],
            this.dateArrayData[2],
            this.dateArrayData[3],
            this.dateArrayData[4],
            this.dateArrayData[5],
            this.dateArrayData[6]
          ],
          backgroundColor: '#949BA0',
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Jobs Added (per day)',
          fontSize: 18,
          fontStyle: 'bold',
          fontColor: '#000',
          padding: 20
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            barPercentage: .5
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: tickData
          }],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let label: string;
              const val = Math.floor(parseInt(tooltipItem.value, 10));
              if (val === 1) {
                 label = val + ' job added';
              } else {
                label = val + ' jobs added';
              }
              return label;
            }
          },
          displayColors: false
        }
      }
    });
  }

}
