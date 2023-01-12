import { TestBed } from '@angular/core/testing';

import { HexTileModule } from './hex-tile.module';

describe('HexTileModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HexTileModule],
    });
  });

  it('initializes', () => {
    const module: HexTileModule = TestBed.inject(HexTileModule);
    expect(module).toBeTruthy();
  });
});
