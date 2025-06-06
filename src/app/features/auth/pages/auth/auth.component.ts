import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { TopBarAuthComponent } from '../../components/top-bar-auth/top-bar-auth.component';
import { ContentAuthComponent } from '../../components/content-auth/content-auth.component';
import { LoginRegisterButtonSwapComponent } from '../../components/login-register-button-swap/login-register-button-swap.component';
import { AuthIconComponent } from '../../../../shared/components/auth-icon.component';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopBarAuthComponent,
    ContentAuthComponent,
    LoginRegisterButtonSwapComponent,
    AuthIconComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private route = inject(ActivatedRoute);
  activeButton: number = 1;

  constructor() {
    this.route.firstChild?.data.subscribe((data) => {
      this.activeButton = data['activeButton'] || 1;
    });
  }
}
