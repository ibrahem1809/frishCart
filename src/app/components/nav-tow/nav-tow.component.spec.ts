import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTowComponent } from './nav-tow.component';

describe('NavTowComponent', () => {
  let component: NavTowComponent;
  let fixture: ComponentFixture<NavTowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavTowComponent]
    });
    fixture = TestBed.createComponent(NavTowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
