import { Injectable } from '@angular/core';


const USERNAME_KEY = 'AuthUsername';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public saveUsername(username: string | any[]) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    if (typeof username === "string") {
      window.sessionStorage.setItem(USERNAME_KEY, username);
    }
  }
  public getUsername(): string {
    // @ts-ignore
    return sessionStorage.getItem(USERNAME_KEY);
  }
}
