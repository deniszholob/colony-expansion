import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsGroupComponent } from './stats-group.component';
import { StatsGroupModule } from './stats-group.module';

describe('StatsGroupComponent', () => {
  let component: StatsGroupComponent;
  let fixture: ComponentFixture<StatsGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StatsGroupModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
