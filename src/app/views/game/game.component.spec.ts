import { GameService } from 'src/app/utils';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let gameService: GameService;

  beforeEach(() => {
    gameService = new GameService();
    component = new GameComponent(gameService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
