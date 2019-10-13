import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInUpComponent } from './sign-in-up/sign-in-up.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private modalService: NgbModal) { }

  /**
   * sdf
   */
  public canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      const modalRef = this.modalService.open(SignInUpComponent);
      modalRef.componentInstance.login = this.authService.isLoggedIn();
      return false;
    }
    return true;
  }
}
