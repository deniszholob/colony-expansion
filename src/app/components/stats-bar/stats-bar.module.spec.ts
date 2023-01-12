import { TestBed } from '@angular/core/testing';

import { StatsBarModule } from './stats-bar.module';

describe('StatsBarModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatsBarModule],
    });
  });

  it('initializes', () => {
    const module: StatsBarModule = TestBed.inject(StatsBarModule);
    expect(module).toBeTruthy();
  });
});
