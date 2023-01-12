import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TileDataComponent } from './tile-data.component';
import { TileDataModule } from './tile-data.module';

describe('TileDataComponent', () => {
  let component: TileDataComponent;
  let fixture: ComponentFixture<TileDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TileDataModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
