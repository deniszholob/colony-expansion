import { TestBed } from '@angular/core/testing';

import { HexGridModule } from './hex-grid.module';

describe('HexGridModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HexGridModule],
    });
  });

  it('initializes', () => {
    const module: HexGridModule = TestBed.inject(HexGridModule);
    expect(module).toBeTruthy();
  });
});
