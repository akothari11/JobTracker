import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.scss']
})
export class SignInUpComponent implements OnInit {
  @Input() public login: boolean;
  public userCredentials: UserDetails =
  {
    name: '',
    email: '',
    password: '',

  };
  public invalidEmail: boolean;
  public invalidPassword: boolean;
  public invalidName: boolean;
  public authenticationFailed: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private activeModal: NgbActiveModal, private authService: AuthenticationService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  /**
   * Use authentication service to login/sign up and redirect user on success
   */
  public authenticate(): void {
    if (this.login) {
      this.authService.login(this.userCredentials).subscribe(() => {
        this.authenticationFailed = false;
        this.activeModal.close();
        this.router.navigateByUrl('/');
      }, (err) => {
        this.authenticationFailed = true;
        console.error(err);
      });
    } else {
      this.authService.register(this.userCredentials).subscribe(() => {
        this.authenticationFailed = false;
        this.activeModal.close();
        this.router.navigateByUrl('/job-list');
      }, (err) => {
        this.authenticationFailed = true;
        console.error(err);
      });
    }
  }

  /**
   * Switch between sign in/ sign up modal
   */
  public open(signIn: boolean): void {
    this.activeModal.close();
    const modalRef = this.modalService.open(SignInUpComponent);
    modalRef.componentInstance.login = signIn;
  }

  /**
   * Check sign in/sign up form for valid data before authenticating
   */
  public validateForm(): void {
    // Login if there is a valid email and password entered
    if (this.login) {
      this.invalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userCredentials.email);
      this.invalidPassword = this.userCredentials.password.length <= 0;
      if (!this.invalidEmail && !this.invalidPassword) {
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.authenticate();
      }
    // Sign up if there is a valid name, email, and password entered
    } else {
      this.invalidName = this.userCredentials.name.length <= 0;
      this.invalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userCredentials.email);
      this.invalidPassword = this.userCredentials.password.length <= 0;
      if (!this.invalidName && !this.invalidEmail && !this.invalidPassword) {
        this.invalidName = false;
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.authenticate();
      }
    }
  }

}
