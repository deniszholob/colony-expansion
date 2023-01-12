import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsBarComponent } from './stats-bar.component';
import { StatsBarModule } from './stats-bar.module';

describe('StatsBarComponent', () => {
  let component: StatsBarComponent;
  let fixture: ComponentFixture<StatsBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StatsBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
