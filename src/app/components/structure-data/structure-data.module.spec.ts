import { TestBed } from '@angular/core/testing';

import { StructureDataModule } from './structure-data.module';

describe('StructureDataModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StructureDataModule],
    });
  });

  it('initializes', () => {
    const module: StructureDataModule = TestBed.inject(StructureDataModule);
    expect(module).toBeTruthy();
  });
});
