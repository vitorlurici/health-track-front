import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { FooterComponent } from '../../../core/layout/components/footer/footer.component';
import { PressaoDialogComponent } from '../pressao-diao-dialog/pressao-diao-dialog.component';
import { LogoComponent } from '../../../shared/components/logo.component';




@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, FooterComponent, MatDialogModule, PressaoDialogComponent, LogoComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  constructor(private dialog: MatDialog) { }

  abrirDialog(): void {
    this.dialog.open(PressaoDialogComponent, {
      width: '400px',
    });
  }


  mostrarRegistros: boolean = false;

  mostrarOuEsconderRegistros() {
    this.mostrarRegistros = !this.mostrarRegistros;
  }

  registros: { tipo: string; valor: number; data: string }[] = [
    { tipo: 'pressao', valor: 120, data: '01/06/2025' },
    { tipo: 'glicose', valor: 95, data: '01/06/2025' },
    { tipo: 'pressao', valor: 118, data: '31/05/2025' },
    { tipo: 'glicose', valor: 102, data: '31/05/2025' },
    { tipo: 'pressao', valor: 122, data: '30/05/2025' },
    { tipo: 'glicose', valor: 110, data: '30/05/2025' },
    { tipo: 'pressao', valor: 115, data: '29/05/2025' },
  ];
}
