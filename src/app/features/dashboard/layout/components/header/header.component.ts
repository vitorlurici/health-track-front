import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../../../../../shared/components/logo.component';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  openProfile() {
    console.log('Abrir perfil');
    // Implemente a navegação para o perfil ou abra um modal
  }

  logout() {
    console.log('Logout');
    // Implemente a lógica de logout aqui
  }
}
