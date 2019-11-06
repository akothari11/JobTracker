import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobAddComponent } from './job-add/job-add.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AuthGuardService } from './auth-guard.service';
import { JobDetailsComponent } from './job-details/job-details.component';


const routes: Routes = [
  { path: 'job-list', component: JobListComponent, canActivate: [AuthGuardService] },
  { path: 'job-add', component: JobAddComponent },
  { path: 'job-details/:id', component: JobDetailsComponent },
  { path: 'home', component: HomeScreenComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
