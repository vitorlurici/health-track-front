import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  cards = [
    {
      title: 'Card 1',
      image: 'https://via.placeholder.com/300x150',
      description: 'Texto do card 1',
    },
    {
      title: 'Card 2',
      image: 'https://via.placeholder.com/300x150',
      description: 'Texto do card 2',
    },
    {
      title: 'Card 3',
      image: 'https://via.placeholder.com/300x150',
      description: 'Texto do card 3',
    },
    {
      title: 'Card 4',
      image: 'https://via.placeholder.com/300x150',
      description: 'Texto do card 4',
    },
  ];
}
