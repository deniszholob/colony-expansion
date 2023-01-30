import { GameService } from './game.service';

describe('GameService', () => {
  const service: GameService = new GameService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
