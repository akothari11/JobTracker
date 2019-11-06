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

  /**
   * Open sign in modal
   */
  public signIn(): void {
    const modalRef = this.modalService.open(SignInUpComponent);
    modalRef.componentInstance.login = true;
  }

  /**
   * Call authentication service to log out user
   */
  public logout(): void {
    this.authService.logout();
  }

  /**
   * Call authentication service find if a user is currently logged in
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
