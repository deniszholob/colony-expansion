import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatsEntityComponent } from './stats-entity.component';
import { StatsEntityModule } from './stats-entity.module';

describe('StatsEntityComponent', () => {
  let component: StatsEntityComponent;
  let fixture: ComponentFixture<StatsEntityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StatsEntityModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
