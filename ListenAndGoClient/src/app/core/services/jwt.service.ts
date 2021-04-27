import { Injectable } from '@angular/core';

const storageKey = 'jwtToken';

@Injectable()
export class JwtService {
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(storageKey);
  }

  setToken(token: string): void {
    localStorage.setItem(storageKey, token);
  }

  deleteToken(): void {
    localStorage.removeItem(storageKey);
  }
}
