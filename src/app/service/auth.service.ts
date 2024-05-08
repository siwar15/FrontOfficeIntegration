import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationResponse } from '../model/authentication-response';
import { VerificationRequest } from '../model/varification-request';
import { RegisterRequest } from '../model/register-request';
import { AuthenticationRequest } from '../model/authentication-request';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private baseUrl:string = "http://192.168.1.156:8080/api/v1/auth/"
  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest) {
    return this.http.post<AuthenticationResponse>(this.baseUrl + 'register', registerRequest).pipe(
      catchError(error => {
        if (error.status === 500) {
          return throwError('emailExists');
        }
        return throwError(error);
      })
    );
  }
  authenticate(authenticationRequest: AuthenticationRequest ) {
    return this.http.post<AuthenticationResponse>(this.baseUrl + 'authenticate', authenticationRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}verify`, verificationRequest);
  }
  getCurrentUserId(): Observable<number> {
    // Retrieve the token from local storage or wherever it's stored
    const token = localStorage.getItem('token'); // Assuming you store the token in local storage

    // Add the token to the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Include the headers in the HTTP GET request
    return this.http.get<number>(`${this.baseUrl}user/me/id`, { headers: headers });
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }


}
