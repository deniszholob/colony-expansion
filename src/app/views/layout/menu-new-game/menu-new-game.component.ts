import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-new-game',
  templateUrl: './menu-new-game.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [':host { display: contents; } '],
})
export class MenuNewGameComponent {
  @Output()
  public startChange: EventEmitter<void> = new EventEmitter();

  public onStartNewGame(): void {
    this.startChange.emit();
  }
}
