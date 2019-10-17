import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInUpComponent } from '../sign-in-up/sign-in-up.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  constructor(private modalService: NgbModal, private authService: AuthenticationService) {}

  ngOnInit() {
  }

  /**
   * Open the modal to sign in/sign up
   * @param signIn true if modal to open is user sign in
   */
  public open(signIn: boolean): void {
    const modalRef = this.modalService.open(SignInUpComponent);
    modalRef.componentInstance.login = signIn;
  }

  /**
   * Call authentication service find if a user is currently logged in
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
