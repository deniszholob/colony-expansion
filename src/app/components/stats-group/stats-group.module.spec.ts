import { TestBed } from '@angular/core/testing';

import { StatsGroupModule } from './stats-group.module';

describe('StatsGroupModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatsGroupModule],
    });
  });

  it('initializes', () => {
    const module: StatsGroupModule = TestBed.inject(StatsGroupModule);
    expect(module).toBeTruthy();
  });
});
