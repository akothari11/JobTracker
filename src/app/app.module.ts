import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobStatsComponent } from './job-stats/job-stats.component';
import { JobAddComponent } from './job-add/job-add.component';
import { JobEditModalComponent } from './job-edit/job-edit-modal.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';
import { FormsModule } from '@angular/forms';
import { JobFormComponent } from './job-form/job-form.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { JobDetailsComponent } from './job-details/job-details.component';


@NgModule({
  declarations: [
    AppComponent,
    JobListComponent,
    JobStatsComponent,
    JobAddComponent,
    JobEditModalComponent,
    HomeScreenComponent,
    SignInUpComponent,
    JobFormComponent,
    JobDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [AuthenticationService, AuthGuardService],
  entryComponents: [
    JobEditModalComponent,
    SignInUpComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
