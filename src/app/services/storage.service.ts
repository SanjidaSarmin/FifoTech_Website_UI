import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public getToken(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      const userToken = JSON.parse(user)
      return userToken.jwtToken;
    }

    return {};
  }
  
  clean(): void {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY); 
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      const userData = JSON.parse(user);
      console.log("User ------",JSON.parse(user))
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(userData.jwtToken);
      console.log("decodedToken -------",decodedToken)
// Other functions
      const expirationDate = helper.getTokenExpirationDate(userData.jwtToken);
      console.log("expirationDate --",expirationDate)
      const isExpired = helper.isTokenExpired(userData.jwtToken);
      console.log("isExpired --",isExpired)

      return decodedToken;
    }
    return {};
  }

  getUserRole(): string | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (!user) return null;
  
    const userData = JSON.parse(user);
    const helper = new JwtHelperService();    // npm install @auth0/angular-jwt
    const decodedToken = helper.decodeToken(userData.jwtToken);
 
    return decodedToken.roles ? decodedToken.roles[0] : null;
  }
  
  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY); 
    if (user) {
      return true;
    }
    return false;
  }

  getDecodedToken(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      const userData = JSON.parse(user);
      const helper = new JwtHelperService();
      return helper.decodeToken(userData.jwtToken);
    }
    return null;
  }
  
  isTokenExpired(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      const userData = JSON.parse(user);
      const helper = new JwtHelperService();
      return helper.isTokenExpired(userData.jwtToken);
    }
    return true;
  }

  public getEmail(): string | null {
    const user = window.localStorage.getItem(USER_KEY);
    if (!user) return null;
  
    const userData = JSON.parse(user);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(userData.jwtToken);
  
    return decodedToken.sub || null; 
  }
  
  
}

