import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateForm';
import { AuthService } from '../service/auth.service';
import { RegisterRequest } from '../model/register-request';
import { AuthenticationResponse } from '../model/authentication-response';
import { AuthenticationRequest } from '../model/authentication-request';
import { Router } from '@angular/router';
import { VerificationRequest } from '../model/varification-request';
import {HeaderComponent} from "../header/header.component";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    const valid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    return valid ? null : { invalidEmail: true };
  }






  otpCode: string = '';
  authRequest: AuthenticationRequest = {};
  authResponse: AuthenticationResponse = {};
  @ViewChild('password') passwordInput!: ElementRef;
  @ViewChild('togglePassword') togglePasswordIcon!: ElementRef;
  loginForm!: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService ,private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]

    })

  }
  ngAfterViewInit() {
    this.togglePasswordIcon.nativeElement.addEventListener('click', () => {
      if (this.passwordInput.nativeElement.type === 'password') {
        this.passwordInput.nativeElement.type = 'text';
        console.log('Password is now visible');
      } else {
        this.passwordInput.nativeElement.type = 'password';
        console.log('Password is now hidden');
      }
    });
  }
  Onlogin(){
    if(this.loginForm.valid){
      this.authRequest.email = this.loginForm.get('email')?.value;
    this.authRequest.password = this.loginForm.get('password')?.value;
      this.auth.authenticate(this.authRequest)
      .subscribe({
        next: (response : AuthenticationResponse) => {
          this.authResponse = response;

          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accessToken as string);
            this.auth.setLoggedIn(true); // Set isLoggedIn to true

            this.router.navigate(['/home']);
          }
        }
      });
    }
    else{
      ValidateForm.validateAllFormfields(this.loginForm);
      alert("Your form is invalid")
    }
  }
  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.auth.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['welcome']);
        }
      });
  }



}
