import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../../components/logo.component';

@Component({
  selector: 'app-top-bar-auth',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './top-bar-auth.component.html',
  styleUrls: ['./top-bar-auth.component.scss'],
})
export class TopBarAuthComponent {}
