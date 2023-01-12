import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StructureDataComponent } from './structure-data.component';
import { StructureDataModule } from './structure-data.module';

describe('StructureDataComponent', () => {
  let component: StructureDataComponent;
  let fixture: ComponentFixture<StructureDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StructureDataModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
