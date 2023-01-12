import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HexTileComponent } from './hex-tile.component';
import { HexTileModule } from './hex-tile.module';

describe('HexTileComponent', () => {
  let component: HexTileComponent;
  let fixture: ComponentFixture<HexTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HexTileModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
