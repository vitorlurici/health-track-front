import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-register-button-swap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-register-button-swap.component.html',
  styleUrls: ['./login-register-button-swap.component.scss'],
})
export class LoginRegisterButtonSwapComponent {
  @Input() activeButton: number | null = 1;
  @Output() activeButtonChange = new EventEmitter<number>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  setActiveButton(button: number): void {
    this.activeButton = button;
    this.activeButtonChange.emit(button);
    this.router.navigate([button === 1 ? 'login' : 'register'], {
      relativeTo: this.route.parent,
    });
  }
}
