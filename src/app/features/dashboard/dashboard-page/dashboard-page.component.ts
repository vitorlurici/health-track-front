import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FooterComponent } from '../../../core/layout/components/footer/footer.component';
import { PressaoDialogComponent } from '../pressao-diao-dialog/pressao-diao-dialog.component';
import { LogoComponent } from '../../../shared/components/logo.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule, FooterComponent,MatDialogModule, PressaoDialogComponent, LogoComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
    constructor(private dialog: MatDialog) {}
    
  abrirDialog(): void {
    this.dialog.open(PressaoDialogComponent, {
      width: '400px',
    });
  }
}
