import { TestBed } from '@angular/core/testing';

import { GameModule } from './game.module';

describe('GameModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameModule],
    });
  });

  it('initializes', () => {
    const module: GameModule = TestBed.inject(GameModule);
    expect(module).toBeTruthy();
  });
});
