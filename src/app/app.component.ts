import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_MODIFIED_DATE } from './app.modified';
import { FooterComponent } from './views';
import { GameComponent } from './views/game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, GameComponent],
})
export class AppComponent {
  public readonly APP_MODIFIED_DATE: number = APP_MODIFIED_DATE;
}
