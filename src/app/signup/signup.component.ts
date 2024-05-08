import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ValidateForm from '../helpers/validateForm';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthenticationResponse } from '../model/authentication-response';
import { VerificationRequest } from '../model/varification-request';
import { RegisterRequest } from '../model/register-request';
import {Router} from "@angular/router";
import { CommonModule, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit, AfterViewInit {
  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    const valid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    return valid ? null : { invalidEmail: true };
  }


  @ViewChild('password') passwordInput!: ElementRef;
  @ViewChild('togglePassword') togglePasswordButton!: ElementRef;
  public signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,    private router: Router) { }
  message: string = '';
  otpCode: string = '';
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      //userName:['', Validators.required],
      email:['', [Validators.required, this.emailValidator]],
      password:['', [Validators.required, Validators.minLength(8)]],
      mfaEnabled: [false], // add this line
      otpCode: [''] // add this line;


    })
    this.signUpForm.get('otpCode')?.valueChanges.subscribe(value => {
      this.otpCode = value;
    });
    // Add any initialization logic here
  }

  ngAfterViewInit() {
    this.togglePasswordButton.nativeElement.addEventListener('click', () => {
      if (this.passwordInput.nativeElement.type === 'password') {
        this.passwordInput.nativeElement.type = 'text';
        console.log('Password is now visible');
      } else {
        this.passwordInput.nativeElement.type = 'password';
        console.log('Password is now hidden');
      }
    });
  }
  formSubmitted = false;
  onSignUp() {
    if (this.signUpForm.valid) {
      this.message = '';
      this.registerRequest = this.signUpForm.value;

      this.auth.register(this.registerRequest).subscribe(
        response => {
          if (response) {
            this.authResponse = response;
          } else {
            // inform the user
            this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          }
        },
        error => {
          if (error === 'emailExists') {
            this.signUpForm.get('email')?.setErrors({ emailExists: true });
          }
        }
      );
    } else {
      ValidateForm.validateAllFormfields(this.signUpForm);
      alert("Your form is invalid");
    }
  }


  verifyTfa() {
    this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    };
    this.auth.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);
          }, 3000);
        }
      });
  }




}
