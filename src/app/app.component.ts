import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <h1>Bem-vindo ao Health Track</h1>
      <div class="button-group">
        <button (click)="navigateToLogin()">Login</button>
        <button (click)="navigateToRegister()">Cadastro</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
      }

      .button-group {
        display: flex;
        gap: 20px;
        margin-top: 20px;
      }

      button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        background-color: #34baab;
        color: white;
        border: none;
        border-radius: 4px;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #2a9d8f;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
