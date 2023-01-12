import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HexGridComponent } from './hex-grid.component';
import { HexGridModule } from './hex-grid.module';

describe('HexGridComponent', () => {
  let component: HexGridComponent;
  let fixture: ComponentFixture<HexGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HexGridModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
