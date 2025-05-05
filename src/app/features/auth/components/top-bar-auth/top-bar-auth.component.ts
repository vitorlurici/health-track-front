import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar-auth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar-auth.component.html',
  styleUrls: ['./top-bar-auth.component.scss'],
})
export class TopBarAuthComponent {}
