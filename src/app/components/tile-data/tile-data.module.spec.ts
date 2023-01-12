import { TestBed } from '@angular/core/testing';

import { TileDataModule } from './tile-data.module';

describe('TileDataModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TileDataModule],
    });
  });

  it('initializes', () => {
    const module: TileDataModule = TestBed.inject(TileDataModule);
    expect(module).toBeTruthy();
  });
});
