import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from './../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  roleAs: string[] = ['ROLE_USER'];

  constructor() {}

  authenticate(username: string, password: string): Observable<any> {
    const mockResponse = {
      body: {
        token: 'mock-jwt-token',
        roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']
      }
    };
    this.successfulLogin(mockResponse.body.token, mockResponse.body.roles);
    return of(mockResponse);
  }

  successfulLogin(authToken: string, role: string[]) {
    localStorage.setItem('token', authToken);
    this.roleAs = role;
    localStorage.setItem('role', JSON.stringify(this.roleAs));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  logout() {
    localStorage.clear();
  }

  getRole() {
    const role = localStorage.getItem('role');
    if (role) {
      this.roleAs = JSON.parse(role);
    }
    return this.roleAs;
  }
}