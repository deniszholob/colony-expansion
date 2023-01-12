import { TestBed } from '@angular/core/testing';

import { StatsEntityModule } from './stats-entity.module';

describe('StatsEntityModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatsEntityModule],
    });
  });

  it('initializes', () => {
    const module: StatsEntityModule = TestBed.inject(StatsEntityModule);
    expect(module).toBeTruthy();
  });
});
