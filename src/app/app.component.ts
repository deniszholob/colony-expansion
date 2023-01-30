import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_MODIFIED_DATE } from './app.modified';
import { FooterComponent, GameComponent, MenuNewGameComponent } from './views';

enum GameState {
  GAME_NEW,
  GAME_PROGRESS,
  GAME_OVER,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    GameComponent,
    MenuNewGameComponent,
  ],
})
export class AppComponent {
  public readonly APP_MODIFIED_DATE: number = APP_MODIFIED_DATE;
  public readonly GameState = GameState;
  public gameState: GameState = GameState.GAME_NEW;

  public onNewGame(): void {
    this.gameState = GameState.GAME_NEW;
  }

  public onGameStart(): void {
    this.gameState = GameState.GAME_PROGRESS;
  }

  public onGameOver(): void {
    this.gameState = GameState.GAME_OVER;
  }
}
