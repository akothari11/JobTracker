import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-stats';

  constructor(private authService: AuthenticationService, private modalService: NgbModal ) {
  }
  public signIn() {
    const modalRef = this.modalService.open(SignInUpComponent);
    modalRef.componentInstance.login = true;
  }
  public logout() {
    this.authService.logout();
  }
}
