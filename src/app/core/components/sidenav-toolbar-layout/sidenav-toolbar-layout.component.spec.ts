import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavToolbarLayoutComponent } from './sidenav-toolbar-layout.component';

describe('SidenavToolbarLayoutComponent', () => {
  let component: SidenavToolbarLayoutComponent;
  let fixture: ComponentFixture<SidenavToolbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavToolbarLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavToolbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
